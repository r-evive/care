"use client"

import { TService } from '@/models/Service';
import { useChangeServiceMutation } from '@/store/api/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';


type ServicesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    service: TService | null;
    cityID?: string;
}

export const ServicesModal = (props: ServicesModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [updateService] = useChangeServiceMutation();
    const [name, setName] = useState(props.service?.name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, [])

    const clearForm = () => {
        setName('');
    }

    const handleOnSave = () => {
        if(!name){
            toast.error('Wypełnij wszystkie pola');
            return;
        }

        if(props.service){
            updateService({
                _id: props.service._id,
                name: name,
                editing: true
            }).unwrap().then(() => {
                toast.success('Zaktualizowano usługę');
                router.refresh();
                props.onClose();
            }).catch(() => {
                toast.error('Wystąpił błąd podczas aktualizacji miasta');
            })
        }
        else{
            updateService({
                name: name,
                city: props.cityID,
                editing: false
            }).unwrap().then(() => {
                toast.success('Dodano nową usługę');
                router.refresh();
                clearForm();
                props.onClose();
            }).catch(() => {
                toast.error('Wystąpił błąd podczas dodawania usługi');
            })
        }

    }

    if(!props.isOpen) return null;

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose}>
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {props.service ? 'Edytuj usługę' : 'Dodaj usługę'}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nazwa:</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={name} onChange={handleNameChange}/>
                    </div>
                </form>
                </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end gap-3">
                        <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700" onClick={props.onClose}>Anuluj</button>
                        <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleOnSave}>Zapisz</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ServicesModal