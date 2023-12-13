import {configureStore} from '@reduxjs/toolkit';
import { appAPI } from './api/app';

export const store = configureStore({
    reducer: {
        [appAPI.reducerPath]: appAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ appAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;