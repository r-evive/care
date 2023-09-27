"use client";

import LoginForm from '@/components/LoginForm/LoginForm';
import Providers from '@/store/provider'
import React from 'react'


type Props = {}

const Register = (props: Props) => {
  return (
    <Providers>
        <LoginForm/>
    </Providers>
  )
}

export default Register