import { DefaultResponse } from '@/types/Response'
import { UserModel, UserRegister } from '@/types/User'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        register: builder.mutation<DefaultResponse, UserRegister>({
            query: (body) => ({
                url: '/user/register',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useRegisterMutation } = userApi