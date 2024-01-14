import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const ApiLink = () => {
    const router = useRouter()
    const [linkId, setLinkId] = useState(null)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const {data, error, mutate} = useSWR('api/links/' + linkId + '/', () =>
        axios
            .get('api/links/' + linkId + '/')
            .then(res => res.data)
            .catch(error => {
                throw error
            }),
    )

    
    const createLink = async ({...props }) => {

        setErrors([])
        setStatus(null)
        setLinkId(null)

        axios
            .post('api/links/', props)
            .then(response => {
                setLinkId(response.data.id)
                mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const destroyLink = async () => {
        if (!error) {
            await axios.delete('/api/links/' + linkId +'/').then(() => mutate())
        }

        window.location.pathname = '/'
    }

    useEffect(() => {
        console.log('window.location.pathname')
        if (window.location.pathname =='/' && typeof data != "undefined") router.push('home')
        
        if (window.location.pathname !='/' && error) destroyLink()
    }, [data, error])

    return {
        data,
        createLink,
        destroyLink,
    }
}