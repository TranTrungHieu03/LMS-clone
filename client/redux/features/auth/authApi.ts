import {apiSlice} from "@/redux/features/api/apiSlice";
import {userLogin, userLogout, userRegistration} from "@/redux/features/auth/authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}
type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (err: any) {
                    console.log(err)
                }
            }
        }),
        activation: builder.mutation({
            query: ({activation_token, activation_code}) => ({
                url: "activation",
                method: "POST",
                body: {
                    activation_code,
                    activation_token
                }
            })
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: "login",
                method: "POST",
                body: {
                    email,
                    password
                },
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
        }),
        socialAuth: builder.mutation({
            query: ({email, name, avatar}) => ({
                url: "social-auth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
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
        }),
        logout: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    dispatch(
                        userLogout()
                    )
                } catch (err: any) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogoutQuery
} = authApi