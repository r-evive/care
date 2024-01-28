import { TCity } from "@/models/City";
import { DefaultResponse } from "@/types/Response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { appAPI } from "./app";
import { TService } from "@/models/Service";



export const extendedDataApi = appAPI.injectEndpoints({
    endpoints: (builder) => ({
        getCities: builder.query<TCity[], void>({
            query: () => ({
                url: '/public/cities',
                method: 'GET',
            }),
        }),
        getServices: builder.query<TService[], string>({
            query: (city:string) => ({
                url: '/public/services',
                method: 'GET',
                params: {
                    city
                }
            }),
        }),
    }),
})

export const { useGetCitiesQuery, useGetServicesQuery } = extendedDataApi;