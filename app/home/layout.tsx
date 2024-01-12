import type { Metadata } from 'next'
import '../globals.css'


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
    <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
                </div>
            </header>

            <main>{children}</main>
        </div>
  )
}
