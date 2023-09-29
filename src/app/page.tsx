import useHasPermission from '@/hooks/useHasPermission';
import useHasRole from '@/hooks/useHasRole';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image'

export default async function Home() {

    console.log('server');
    const session = await getServerSession(authOptions);

    const hasPermission = await useHasPermission('user');
    const hasRole = await useHasRole('user');

    console.log('Has permission: ', hasPermission);
    console.log('Has role: ', hasRole);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            123
        </main>
    )
}
