import { getUserPeople } from "@/controllers/User";
import { UserPerson } from "@/types/User";
import PeopleForm from "./PeopleForm/PeopleForm";

const People = async () => {
    let people: UserPerson[] = await getUserPeople();

    return (
        <>
            <h2 className="text-xl font-bold mb-5">Osoby</h2>
            <PeopleForm people={people}/>
        </>
    )

}

export default People;