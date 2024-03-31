import NavLayout from '@/layouts/NavLayout/NavLayout';
import Main from './components/Main/Main';
import { getSession } from 'next-auth/react';

export default async function Home() {
    let session = await getSession();
    console.log(session);

    return (
        <NavLayout>
            <Main />
        </NavLayout>
    )
}
