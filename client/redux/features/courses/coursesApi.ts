import {apiSlice} from "@/redux/features/api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => {
                console.log("Payload data:", data);
                return ({
                    url: "create-course",
                    method: "POST",
                    body: data,
                    credentials: "include" as const
                })
            }
        })
    })
})

export const {useCreateCourseMutation} = coursesApi