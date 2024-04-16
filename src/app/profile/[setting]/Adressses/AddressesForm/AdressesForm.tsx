"use client";

import { UserAddress } from "@/types/User";
import AddAddress from "./AddAddress/AddAddress";
import { useState } from "react";
import Address from "./Address/Address";

type AddressFormProps = {
    adresses: UserAddress[];
    source?: 'reservation' | 'profile';
}

const AddressesForm = (props: AddressFormProps) => {
    const [active, setActive] = useState(false);
    const [activeMode, setActiveMode] = useState<"add" | "edit">("add");
    const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

    const toggleAddActive = (value:boolean) => {
        setActiveMode("add");
        setActive(value);
    }

    const toggleEditingAddress = (address:UserAddress) => {
        setActiveMode("edit");
        setEditingAddress(address);
        setActive(true);
    }

    const resetEditingAddress = () => {
        setActiveMode("add");
        setEditingAddress(null);
    }

    return (
        <>
            <div className="grid grid-cols-1">
                {active ? <AddAddress mode={activeMode} display="form" toggleActive={toggleAddActive} addressValue={editingAddress} resetAddress={resetEditingAddress}/> : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {props.adresses.map((address, index) => <Address address={address} key={index} index={index + 1} toggleEdit={toggleEditingAddress} source={props.source}/>)}
                {!active && props.adresses.length < 3 ? <AddAddress mode="add" display="block" toggleActive={toggleAddActive}/> : null}
            </div>
        </>
    );
}

export default AddressesForm;