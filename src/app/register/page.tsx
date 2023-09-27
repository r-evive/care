"use client";

import RegisterForm from '@/components/RegisterForm/RegisterForm'
import Providers from '@/store/provider'
import React from 'react'


type Props = {}

const Register = (props: Props) => {
  return (
    <Providers>
        <RegisterForm/>
    </Providers>
  )
}

export default Register