import { PropsWithChildren } from "react";

type ProfilePageProps = {
    visible: boolean;
}

const ProfilePage = ({visible, children}: PropsWithChildren<ProfilePageProps>) => {
    if(!visible) return null;

    return (
        <>
            {children}
        </>
    )
}

export default ProfilePage;