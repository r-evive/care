import Footer from '@/client/components/Footer/Footer'
import Navigation from '@/client/components/Navigation/Navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const NavLayout = ({children}: React.PropsWithChildren<Props>) => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
        <Navigation />
        <section className="flex-grow">
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
        <Footer />
    </main>
  )
}

export default NavLayout