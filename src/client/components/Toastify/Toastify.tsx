"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {}

const Toastify = () => {
  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
        />
    </>
  )
}

export default Toastify