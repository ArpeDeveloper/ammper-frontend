import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'

export const ApiAccounts = (linkId: String | null) => {
    const [errors, setErrors] = useState([])

    const {data} = useSWR('api/accounts/' + linkId + '/', () => linkId ?
        axios
            .post('api/accounts/', {
                link: linkId,
                save_data: true
            })
            .then(res => res.data)
            .catch(error => {
                setErrors(error.response.data.errors)
            }) : undefined,
    )


    return {
        data,
        errors
    }
}