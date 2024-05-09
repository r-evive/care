import { GetUserRole, GetUsersList } from "@/controllers/Manage";
import ChangeRoleButton from "./ChangeRoleButton/ChangeRoleButton";

type UsersListProps = {

}

const UsersList = async (props: UsersListProps) => {

    const usersList = await GetUsersList();

    return (
        <>
            <h2 className="text-xl font-bold mb-5">Użytkownicy</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            L.P.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imię
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nazwisko
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rola
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user, index) => {
                        return (
                            <tr className="odd:bg-white even:bg-gray-50" key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.firstName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {GetUserRole(user.role)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ChangeRoleButton userId={user._id} role={user.role}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default UsersList