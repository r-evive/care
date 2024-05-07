import NavLayout from "@/layouts/NavLayout/NavLayout";
import Container from "./Container/Container";
import ManageLayout from "@/layouts/ManageLayout/ManageLayout";

export default function Profile({params}: {params: {setting: string}}) {
    return (
        <NavLayout>
            <ManageLayout path={params.setting}>
                <Container visible={params.setting === 'settings'}>

                </Container>
                <Container visible={params.setting === 'addresses'}>

                </Container>
                <Container visible={params.setting === 'people'}>

                </Container>
                <Container visible={params.setting === 'availability'}>

                </Container>
            </ManageLayout>
        </NavLayout>
    );
}