import NavLayout from '@/layouts/NavLayout/NavLayout';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard';
import { SearchResource } from '@/controllers/Services';
import { TServiceUser } from '@/types/Service';
import { redirect } from 'next/navigation'
import { GetCaregiverDetails } from '@/controllers/Reservation';
import { TCaregiverDetails } from '@/types/User';



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
            Rezerwacja!!!
            {JSON.stringify(params)}
        </NavLayout>
    )
}
