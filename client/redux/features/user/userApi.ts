import {apiSlice} from "@/redux/features/api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({name, email}) => ({
                url: "update-user-info",
                method: "PUT",
                body: {name, email},
                credentials: "include" as const
            })
        }),
        changePassword: builder.mutation({
            query: ({oldPassword, newPassword, confirmPassword}) => ({
                url: "update-user-password",
                method: "PUT",
                body: {oldPassword, newPassword, confirmPassword},
                credentials: "include" as const
            })
        })
    })
})

export const {useUpdateAvatarMutation, useEditProfileMutation, useChangePasswordMutation} = userApi