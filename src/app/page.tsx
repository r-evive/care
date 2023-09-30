import useHasPermission from '@/hooks/useHasPermission';
import useHasRole from '@/hooks/useHasRole';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import  Test  from './Test/Test';
import Image from 'next/image'

export default async function Home() {
    const session = await getServerSession(authOptions);

    const hasPermission = await useHasPermission('user');
    const hasRole = await useHasRole('user');

    console.log('Session: ', session)

    console.log('Has permission: ', hasPermission);
    console.log('Has role: ', hasRole);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            123
            <Test></Test>
        </main>
    )
}
