import {configureStore} from '@reduxjs/toolkit';
import { appAPI } from './api/app';
import reservationSlice from './slices/reservationSlice';

export const store = configureStore({
    reducer: {
        [appAPI.reducerPath]: appAPI.reducer,
        reservation: reservationSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ appAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;