"use client";
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import Modal from 'react-modal';



const Providers = ({ children }: { children: React.ReactNode }) => {
    Modal.setAppElement('body');

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers;