import FullLayout from '@/layouts/FullLayout/FullLayout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
}

export default function LoginLayout({children,}: {children: React.ReactNode}) {
    const style: React.CSSProperties = {
        backgroundImage: 'url(/static/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        <FullLayout style={style}>
            <div className="flex flex-row items-center justify-between p-2 md:p-24 mt-10 md:items-center">
                {children}
            </div>
        </FullLayout>
    )
}
