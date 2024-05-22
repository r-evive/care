import { TCity } from "@/models/City";
import { appAPI } from "./app";
import { TService } from "@/models/Service";
import { DefaultResponse } from "@/types/Response";
import { TReservationCreatePayload } from "@/types/Reservation";



export const extendedReservationsApi = appAPI.injectEndpoints({
    endpoints: (builder) => ({
        createReservation: builder.mutation<DefaultResponse, TReservationCreatePayload>({
            query: (body) => ({
                url: '/restricted/reservations/create',
                method: 'POST',
                body,
            }),
        }),
        changeStatus: builder.mutation<DefaultResponse, { reservationID: string, status: string }>({
            query: ({reservationID, status}) => ({
                url: `/restricted/reservations/status`,
                method: 'POST',
                body:  {reservationID, status},
            }),
        })
    }),
})

export const { useCreateReservationMutation, useChangeStatusMutation } = extendedReservationsApi;