import NavLayout from "@/layouts/NavLayout/NavLayout";
import Container from "./Container/Container";
import ManageLayout from "@/layouts/ManageLayout/ManageLayout";
import UsersList from "./UsersList/UsersList";
import CaregiversList from "./CaregiversList/CaregiversList";
import Cities from "./Cities/Cities";
import Services from "./Services/Services";
import Reservations from "./Reservations/Reservations";

export default function Profile({params}: {params: {setting: string, city: string}}) {
    let citySlug = params?.city?.[0]

    return (
        <NavLayout>
            <ManageLayout path={params.setting}>
                <Container visible={params.setting === 'users'}>
                    <UsersList />
                </Container>
                <Container visible={params.setting === 'caregivers'}>
                    <CaregiversList />
                </Container>
                <Container visible={params.setting === 'reservations'}>
                    <Reservations />
                </Container>
                <Container visible={params.setting === 'cities'}>
                    {citySlug ? <Services cityID={citySlug}/> : <Cities/>}
                </Container>
                <Container visible={params.setting === 'settings'}>

                </Container>
            </ManageLayout>
        </NavLayout>
    );
}