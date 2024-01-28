import NavLayout from '@/layouts/NavLayout/NavLayout';
import Main from './components/Main/Main';

export default async function Home() {
    return (
        <NavLayout>
            <Main />
        </NavLayout>
    )
}
