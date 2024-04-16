"use client";

import { UserAddress, UserPerson } from "@/types/User";
import { useState } from "react";
import AddPerson from "./AddPerson/AddPerson";
import Person from "./Person/Person";


type PeopleFormProps = {
    people: UserPerson[];
    source?: 'reservation' | 'profile';
}

const PeopleForm = (props: PeopleFormProps) => {
    const [active, setActive] = useState(false);
    const [activeMode, setActiveMode] = useState<"add" | "edit">("add");
    const [editingPerson, setEditingPerson] = useState<UserPerson | null>(null);

    const toggleAddActive = (value:boolean) => {
        setActiveMode("add");
        setActive(value);
    }

    const toggleEditingPerson = (person:UserPerson) => {
        setActiveMode("edit");
        setEditingPerson(person);
        setActive(true);
    }

    const resetEditingPerson = () => {
        setActiveMode("add");
        setEditingPerson(null);
    }

    return (
        <>
            <div className="grid grid-cols-1">
                {active ? <AddPerson mode={activeMode} display="form" toggleActive={toggleAddActive} personValue={editingPerson} resetPerson={resetEditingPerson}/> : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {props.people.map((person, index) => <Person person={person} key={index} index={index + 1} toggleEdit={toggleEditingPerson} source={props.source}/>)}
                {!active && props.people.length < 3 ? <AddPerson mode="add" display="block" toggleActive={toggleAddActive}/> : null}
            </div>
        </>
    );
}

export default PeopleForm;