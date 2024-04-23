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
    }),
})

export const { useCreateReservationMutation } = extendedReservationsApi;