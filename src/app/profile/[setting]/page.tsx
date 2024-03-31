import NavLayout from "@/layouts/NavLayout/NavLayout";
import ProfileLayout from "@/layouts/ProfileLayout/ProfileLayout";
import { useRouter } from 'next/navigation'
import ProfilePage from "./ProfilePage/ProfilePage";
import Settings from "./Settings/Settings";
import Adresses from "./Adressses/Adresses";
import People from "./People/People";
import Availability from "./Availability/Availability";

export default function Profile({params}: {params: {setting: string}}) {


    return (
        <NavLayout>
            <ProfileLayout path={params.setting}>
                <ProfilePage visible={params.setting === 'settings'}>
                    <Settings />
                </ProfilePage>
                <ProfilePage visible={params.setting === 'addresses'}>
                    <Adresses />
                </ProfilePage>
                <ProfilePage visible={params.setting === 'people'}>
                    <People />
                </ProfilePage>
                <ProfilePage visible={params.setting === 'availability'}>
                    <Availability />
                </ProfilePage>
            </ProfileLayout>
        </NavLayout>
    );   
}