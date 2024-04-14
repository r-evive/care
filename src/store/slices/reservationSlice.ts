import { AvailabilityBlock, AvailabilityScope, TSerializedAvailabilityBlock } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ReservationState = {
    startBlock: TSerializedAvailabilityBlock | undefined;
    endBlock: TSerializedAvailabilityBlock | undefined;
    serviceId: string | undefined;
    caregiverId: string | undefined;
}

const initialState: ReservationState = {
    startBlock: undefined,
    endBlock: undefined,
    serviceId: undefined,
    caregiverId: undefined
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setReservationBlocks: (state, action: PayloadAction<{startBlock: TSerializedAvailabilityBlock, endBlock: TSerializedAvailabilityBlock}>) => {
            state.startBlock = action.payload.startBlock;
            state.endBlock = action.payload.endBlock;
        },
        setServiceData: (state, action: PayloadAction<{serviceId: string, caregiverId: string}>) => {
            state.serviceId = action.payload.serviceId;
            state.caregiverId = action.payload.caregiverId;
        }
    }
});

export const { setReservationBlocks, setServiceData } = reservationSlice.actions;
export default reservationSlice.reducer;