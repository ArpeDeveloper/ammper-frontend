
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export const ApiLink = (link: string | null) => {
    const router = useRouter()
    const pathname = usePathname()
    const [linkId, setLinkId] = useState<string | null>(link)
    const [errors, setErrors] = useState([])

    const {data, error, mutate} =  useSWR('api/links/' + linkId + '/', () => linkId ?
        axios
            .get('api/links/' + linkId + '/')
            .then(res => res.data)
            .catch(error => {
                throw error
            }) : undefined
    ) 

    
    const createLink = async ({...props }) => {

        setErrors([])

        axios
            .post('api/links/', props)
            .then(response => {
                setLinkId(response.data.id)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const destroyLink = async () => {
        if (!error && linkId) {
            await axios.delete('/api/links/' + linkId +'/').then(() => mutate())
        }
        router.push('/')
    }

    useEffect(() => {
        
        if (pathname =='/' && typeof data != "undefined") {
            window.localStorage.setItem('linkId', data.id)
            router.push('home')
        }

        if (pathname =='/' && linkId) {
            window.localStorage.setItem('linkId', linkId)
            router.push('home')
        }
        
        if ((pathname !='/' && error) || (pathname !='/' && !linkId)) destroyLink()
    }, [data, linkId])

    return {
        data,
        linkId,
        errors,
        createLink,
        destroyLink,
    }
}