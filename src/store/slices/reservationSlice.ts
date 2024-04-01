import { AvailabilityBlock, AvailabilityScope, TSerializedAvailabilityBlock } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ReservationState = {
    startBlock: TSerializedAvailabilityBlock | undefined;
    endBlock: TSerializedAvailabilityBlock | undefined;
}

const initialState: ReservationState = {
    startBlock: undefined,
    endBlock: undefined,
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setReservationBlocks: (state, action: PayloadAction<{startBlock: TSerializedAvailabilityBlock, endBlock: TSerializedAvailabilityBlock}>) => {
            state.startBlock = action.payload.startBlock;
            state.endBlock = action.payload.endBlock;
        }
    }
});

export const { setReservationBlocks } = reservationSlice.actions;
export default reservationSlice.reducer;