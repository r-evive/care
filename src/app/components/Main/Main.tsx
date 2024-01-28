import React from 'react'
import Search from '../Search/Search'
import Welcome from '../Welcome/Welcome'
import { GetAllCities } from '@/controllers/City'

type Props = {}

const Main = async (props: Props) => {
let possibleCities = await GetAllCities();

  return (
    <div className="py-4 pt-20">
        <Welcome />
        <Search cities={possibleCities}/>
    </div>
  )
}

export default Main