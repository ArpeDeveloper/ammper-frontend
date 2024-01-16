"use client"

import { Button } from '@/components/ui/button'
import { ApiLink } from '@/lib/services/links'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Logout() {
    let linkId = typeof window !== 'undefined' ? window.localStorage.getItem('linkId') : null
    const {destroyLink, isLoading} = ApiLink(linkId)
    
    return (
    <Button onClick={destroyLink} disabled={isLoading} type="submit" className="self-end bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full">
                  {isLoading ? <ArrowPathIcon className=" animate-spin w-full h-6"/> : "Logout"}
                  </Button>
    )
}