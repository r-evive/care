"use client"
import { TCity } from '@/models/City';
import { TService } from '@/models/Service';
import { useGetServicesQuery } from '@/store/api/data';
import { useChangeCaregiverSettingsMutation } from '@/store/api/users';
import { TCaregiverProfile } from '@/types/User';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Select, { SingleValue } from 'react-select'
import { toast } from 'react-toastify';

type CaregiverSettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    caregiver: TCaregiverProfile;
    cities: TCity[];
    selectedCity: CityOption;
    selectedService: ServiceOption
}

export interface CityOption {
    value: string;
    label: string;
    isDisabled: boolean;
}

export interface ServiceOption {
    value: string;
    label: string;
    isDisabled: boolean;
}

export const CaregiverSettingsModal = (props: CaregiverSettingsModalProps) => {
    const [selectedCity, setSelectedCity] = useState<SingleValue<CityOption>>(props.selectedCity);
    const [selectedService, setSelectedService] = useState<SingleValue<ServiceOption>>(props.selectedService);
    const { data, error, isLoading } = useGetServicesQuery(selectedCity?.value ?? '');
    const [cityServices, setCityServices] = useState<TService[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [changeCaregiverSettings] = useChangeCaregiverSettingsMutation();

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, [])

    const getCities = () => {
        let options:CityOption[] = [];

        props.cities.forEach((city) => {
            options.push({
                value: city?._id ?? '',
                label: city.name,
                isDisabled: false
            })
        })

        options.unshift({
            value: '',
            label: 'Wybierz miasto',
            isDisabled: true
        })

        return options;
    }

    const getServices = () => {
        let options:ServiceOption[] = [];

        cityServices.forEach((service) => {
            options.push({
                value: service?._id ?? '',
                label: service.name,
                isDisabled: false
            })
        })

        options.unshift({
            value: '',
            label: 'Wybierz usługę',
            isDisabled: true
        })

        return options;
    }

    const handleCityChange = (city:SingleValue<CityOption>) => {
        setSelectedCity(city);
        setSelectedService(null);
    }

    const handleServiceChange = (service:SingleValue<ServiceOption>) => {
        setSelectedService(service);
    }

    const handleOnSave = () => {
        let city = selectedCity?.value ?? '';
        let service = selectedService?.value ?? '';

        if(!city || !service) toast.error('Wybierz miasto i usługę');

        changeCaregiverSettings({city, service}).unwrap()
            .then(() => {
                props.onClose();
                router.refresh();
            }).catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        if(data)
            setCityServices(data);
    }, [data]);

    if(!props.isOpen) return null;

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose}>
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Zmień ustawienia
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
                        <label className="block mb-2 text-sm font-medium text-gray-900">Imię:</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true} value={props.caregiver.firstName}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nazwisko:</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true} value={props.caregiver.lastName}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email::</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" disabled={true} value={props.caregiver.email}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Miasto:</label>
                        {isMounted ? <Select options={getCities()} className='w-full' placeholder="Wybierz miasto" onChange={handleCityChange} value={selectedCity} id="citySelector" isSearchable={false}/>: null}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Usługa:</label>
                        {isMounted ? <Select options={getServices()} className='w-full' placeholder="Wybierz usługę" isDisabled={!selectedCity} value={selectedService} onChange={handleServiceChange} isSearchable={false} id="serviceSelector"/> : null}
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

export default CaregiverSettingsModal