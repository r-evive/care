"use client";

import RegisterForm from '@/app/register/RegisterForm/RegisterForm'
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