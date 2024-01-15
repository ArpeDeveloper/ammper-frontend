import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

export const ApiTransactions = (linkId: String | null, accountId: String | null, dateFrom: String, dateTo: String) => {
    const [errors, setErrors] = useState([])

    const {data, mutate, isLoading} = useSWR('api/transactions/' + linkId + '/' + accountId + '/', () =>
        linkId && accountId ? axios
            .post('api/transactions/', {
                link: linkId,
                date_from: dateFrom,
                date_to: dateTo,
                account: accountId,
                save_data: true
            })
            .then(res => res.data)
            .catch(error => {
                setErrors(error.response.data.errors)
            }) : undefined
    )

    useEffect(() => {
        console.log('cambio accountId')
        if(!isLoading)
            mutate()
    }, [linkId, accountId, dateFrom, dateTo])


    return {
        data,
        mutate,
        errors
    }
}