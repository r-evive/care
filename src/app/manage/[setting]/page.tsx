import NavLayout from "@/layouts/NavLayout/NavLayout";
import Container from "./Container/Container";
import ManageLayout from "@/layouts/ManageLayout/ManageLayout";
import UsersList from "./UsersList/UsersList";
import CaregiversList from "./CaregiversList/CaregiversList";

export default function Profile({params}: {params: {setting: string}}) {
    return (
        <NavLayout>
            <ManageLayout path={params.setting}>
                <Container visible={params.setting === 'users'}>
                    <UsersList />
                </Container>
                <Container visible={params.setting === 'caregivers'}>
                    <CaregiversList />
                </Container>
                <Container visible={params.setting === 'services'}>

                </Container>
                <Container visible={params.setting === 'settings'}>

                </Container>
            </ManageLayout>
        </NavLayout>
    );
}