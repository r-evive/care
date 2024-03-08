import NavLayout from '@/layouts/NavLayout/NavLayout';
import CaregiverCard from '../components/CaregiverCard/CaregiverCard';
import { Suspense } from 'react'

export default function Search() {
    return (
        <NavLayout>
            <Suspense fallback={<p>Loading feed...</p>}>
                <CaregiverCard/>
            </Suspense>
            <CaregiverCard/>
            <CaregiverCard/>
        </NavLayout>
    )
}
