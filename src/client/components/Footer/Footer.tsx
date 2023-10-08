import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer>
            <div className="w-full mx-auto max-w-screen-xl p-4 text-center">
                <span className="text-sm text-gray-500">© 2023 <a href="https://flowbite.com/" className="hover:underline">Piotr Pietryka</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer