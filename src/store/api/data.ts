import { TCity } from "@/models/City";
import { DefaultResponse } from "@/types/Response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { appAPI } from "./app";
import { TService } from "@/models/Service";
import { TCityManage, TServiceManage } from "@/types/Service";



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
        changeCity: builder.mutation<DefaultResponse, TCityManage>({
            query: (city) => ({
                url: '/restricted/cities',
                method: 'POST',
                body: city
            }),
        }),
        changeService: builder.mutation<DefaultResponse, TServiceManage>({
            query: (service) => ({
                url: '/restricted/services',
                method: 'POST',
                body: service
            }),
        })
    }),
})

export const { useGetCitiesQuery, useGetServicesQuery, useChangeCityMutation, useChangeServiceMutation } = extendedDataApi;