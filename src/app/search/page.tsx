import NavLayout from '@/layouts/NavLayout/NavLayout';
import CaregiverCard from '../components/CaregiverCard/CaregiverCard';
import { Suspense } from 'react'
import { SearchResource } from '@/controllers/Services';
import { TServiceUser } from '@/types/Service';

export default async function Search() {
    let caregivers:TServiceUser[] = await SearchResource('', '', {});

    return (
        <NavLayout>
            {caregivers.map((caregiver) => {
                return <CaregiverCard key={caregiver._id} caregiver={caregiver} />;
            })}
        </NavLayout>
    )
}
