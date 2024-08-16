"use client"
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/redux/features/auth/authSlice";
import {apiSlice} from "@/redux/features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
    
})

// call refresh token function every page load
const initialApp = async () => {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}))
    
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}

initialApp();