import { AvailabilityBlock, AvailabilityScope, TSerializedAvailabilityBlock } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { start } from "repl";

type ReservationState = {
    startBlock: TSerializedAvailabilityBlock | undefined;
    endBlock: TSerializedAvailabilityBlock | undefined;
    serviceId: string | undefined;
    caregiverId: string | undefined;
    addressId: number | undefined;
    personId: number | undefined;
}

const initialState: ReservationState = {
    startBlock: undefined,
    endBlock: undefined,
    serviceId: undefined,
    caregiverId: undefined,
    addressId: undefined,
    personId: undefined
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setReservationBlocks: (state, action: PayloadAction<{startBlock: TSerializedAvailabilityBlock, endBlock: TSerializedAvailabilityBlock}>) => {
            if(new Date(action.payload.startBlock.startTime) > new Date(action.payload.endBlock.startTime)) {
                let tempBlock = action.payload.startBlock;
                action.payload.startBlock = action.payload.endBlock;
                action.payload.endBlock = tempBlock;
            }
            else{
                state.startBlock = action.payload.startBlock;
                state.endBlock = action.payload.endBlock;
            }
        },
        setServiceData: (state, action: PayloadAction<{serviceId: string, caregiverId: string}>) => {
            state.serviceId = action.payload.serviceId;
            state.caregiverId = action.payload.caregiverId;
        },
        setAddress: (state, action: PayloadAction<number | undefined>) => {
            state.addressId = action.payload;
        },
        setPerson: (state, action: PayloadAction<number | undefined>) => {
            state.personId = action.payload;
        }
    }
});

export const { setReservationBlocks, setServiceData, setAddress, setPerson } = reservationSlice.actions;
export default reservationSlice.reducer;