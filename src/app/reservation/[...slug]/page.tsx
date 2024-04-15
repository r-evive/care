import NavLayout from '@/layouts/NavLayout/NavLayout';
import { redirect } from 'next/navigation'
import { GetCaregiverDetails } from '@/controllers/Reservation';
import { TCaregiverDetails } from '@/types/User';
import Reservation from './Reservation/Reservation';



export default async function Search({ params }: { params: { slug: string } }) {
    let caregiverId = params?.slug?.[0];
    let serviceId = params?.slug?.[1];
    console.log('serviceId', caregiverId)

    let caregiver:TCaregiverDetails | null = await GetCaregiverDetails(caregiverId);
    console.log('caregiver', caregiver)

    if(!serviceId || !caregiver){
        redirect('/404');
    }

    return (
        <NavLayout>
            <Reservation caregiver={caregiver}/>
            {JSON.stringify(params)}
        </NavLayout>
    )
}
