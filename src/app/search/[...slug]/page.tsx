import NavLayout from '@/layouts/NavLayout/NavLayout';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard';
import { SearchResource } from '@/controllers/Services';
import { TServiceUser } from '@/types/Service';
import { redirect } from 'next/navigation'



export default async function Search({ params }: { params: { slug: string } }) {
    let caregivers:TServiceUser[] = await SearchResource('', '', {});

    let cityId = params?.slug?.[0];
    let serviceId = params?.slug?.[1];


    if(!cityId || !serviceId){
        redirect('/404');
    }

    return (
        <NavLayout>
            {caregivers.map((caregiver) => {
                return <CaregiverCard key={caregiver._id} caregiver={caregiver} serviceId={serviceId}/>;
            })}
        </NavLayout>
    )
}
