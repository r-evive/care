import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
}

export default function LoginLayout({children,}: {children: React.ReactNode}) {
    return (
        <div className="flex min-h-screen flex-row items-center justify-between p-2 md:p-24 md:items-center">
            {children}
        </div>
    )
}
