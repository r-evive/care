import { DefaultResponse } from "@/types/Response";
import { appAPI } from "./app";
import { UserAddress, UserPerson } from "@/types/User";

export type UserSettingsUpdatePayload = {
    firstName: string;
    lastName: string;
    description: string;
}

export type UserRoleUpdatePayload = {
    userId: string;
    role: string;
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
        deleteAddress: builder.mutation<DefaultResponse, number>({
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
        deletePerson: builder.mutation<DefaultResponse, number>({
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
        }),
        setAvailability: builder.mutation<DefaultResponse, any>({
            query: (body) => ({
                url: '/restricted/user/availability',
                method: 'POST',
                body,
            }),
        }),
        changeUserRole: builder.mutation<DefaultResponse, UserRoleUpdatePayload>({
            query: (body) => ({
                url: '/restricted/user/role',
                method: 'POST',
                body,
            })
        })
    }),
})

export const {  useUpdateUserSettingsMutation,
                useAddAddressMutation, useDeleteAddressMutation, useUpdateAddressMutation,
                useAddPersonMutation, useDeletePersonMutation, useUpdatePersonMutation,
                useSetAvailabilityMutation, useChangeUserRoleMutation
                } = extendedUserApi;