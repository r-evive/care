import Footer from '@/client/components/Footer/Footer'
import Navigation from '@/client/components/Navigation/Navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {
    style?: React.CSSProperties;
}

const FullLayout = ({children, style}: React.PropsWithChildren<Props>) => {
  return (
    <div className="min-h-screen flex flex-col justify-between w-100" style={style}>
        <div className="flex-grow">{children}</div>
    </div>
  )
}

export default FullLayout