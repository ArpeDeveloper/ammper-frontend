import type { Metadata } from 'next'
import '../globals.css'
import Logout from '@/components/auth/logout'

export const metadata: Metadata = {
  title: 'home',
  description: 'home page',
}

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="min-h-screen bg-white">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                      Dashboard
                  </h2>
                  <Logout></Logout>
                </div>
            </header>

            <main>{children}</main>
        </div>
  )
}
