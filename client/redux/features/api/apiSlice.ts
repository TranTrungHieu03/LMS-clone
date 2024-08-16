import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLogin} from "@/redux/features/auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh-token",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        loadUser: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLogin({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (err: any) {
                    console.log(err)
                }
            }
        })
    })
    
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice