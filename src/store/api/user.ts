import { DefaultResponse } from '@/types/Response'
import { UserRegister } from '@/types/User'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_URL}/api` }),
    endpoints: (builder) => ({
        register: builder.mutation<DefaultResponse, UserRegister>({
            query: (body) => ({
                url: '/user/register',
                method: 'POST',
                body,
            }),
             onQueryStarted: async(body, { dispatch, queryFulfilled }) => {
                console.log('Registering user...')
                console.log('Body');

                try {
                    await queryFulfilled;
                    console.log('User registered successfully!');
                }
                catch (err: any) {
                    console.log('User registration failed!');
                }
            }


        }),
    }),
})

export const { useRegisterMutation } = userApi