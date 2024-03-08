import Footer from '@/client/components/Footer/Footer'
import Navigation from '@/client/components/Navigation/Navigation'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const NavLayout = async ({children}: React.PropsWithChildren<Props>) => {
    let session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen flex flex-col justify-between">
        <Navigation hasSession={session ? true: false}/>
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