import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export const ApiLink = (link: string | null) => {
    const router = useRouter()
    const pathname = usePathname()
    const [linkId, setLinkId] = useState<string | null>(link)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    
    const createLink = async ({...props }) => {

        setErrors([])
        setIsLoading(true)
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
        if (linkId) {
            await axios.delete('/api/links/' + linkId +'/').then(() => router.push('/'))
        }
        router.push('/')
    }

    useEffect(() => {

        if (pathname =='/' && linkId) {
            window.localStorage.setItem('linkId', linkId)
            router.push('home')
            setIsLoading(false)
        }
        
        if (pathname !='/' && !linkId) destroyLink()
    }, [linkId])

    return {
        linkId,
        errors,
        isLoading,
        createLink,
        destroyLink,
    }
}