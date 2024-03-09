import { DefaultResponse } from "@/types/Response";
import { appAPI } from "./app";
import { UserAddress, UserPerson } from "@/types/User";

export type UserSettingsUpdatePayload = {
    firstName: string;
    lastName: string;
}


export const extendedUserApi = appAPI.injectEndpoints({
    endpoints: (builder) => ({
        updateUserSettings: builder.mutation<DefaultResponse, UserSettingsUpdatePayload>({
            query: (body) => ({
                url: '/restricted/user/settings',
                method: 'PATCH',
                body,
            }),
        }),
        addAddress: builder.mutation<DefaultResponse, UserAddress>({
            query: (body) => ({
                url: '/restricted/user/address',
                method: 'PUT',
                body,
            }),
        }),
        deleteAddress: builder.mutation<DefaultResponse, string>({
            query: (id) => ({
                url: '/restricted/user/address',
                method: 'DELETE',
                body: { id }
            }),
        }),
        updateAddress: builder.mutation<DefaultResponse, UserAddress>({
            query: (body) => ({
                url: '/restricted/user/address',
                method: 'PATCH',
                body,
            }),
        }),
        addPerson: builder.mutation<DefaultResponse, UserPerson>({
            query: (body) => ({
                url: '/restricted/user/person',
                method: 'PUT',
                body,
            }),
        }),
        deletePerson: builder.mutation<DefaultResponse, string>({
            query: (id) => ({
                url: '/restricted/user/person',
                method: 'DELETE',
                body: { id }
            }),
        }),
        updatePerson: builder.mutation<DefaultResponse, UserPerson>({
            query: (body) => ({
                url: '/restricted/user/person',
                method: 'PATCH',
                body,
            }),
        })
    }),
})

export const {  useUpdateUserSettingsMutation,
                useAddAddressMutation, useDeleteAddressMutation, useUpdateAddressMutation,
                useAddPersonMutation, useDeletePersonMutation, useUpdatePersonMutation  } = extendedUserApi;