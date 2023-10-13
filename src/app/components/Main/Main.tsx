import React from 'react'
import Search from '../Search/Search'
import Welcome from '../Welcome/Welcome'

type Props = {}

const Main = (props: Props) => {
  return (
    <div className="py-4 pt-20">
        <Welcome />
        <Search/>
    </div>
  )
}

export default Main