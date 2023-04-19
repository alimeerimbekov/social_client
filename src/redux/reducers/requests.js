import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const requestsSlice = createApi({
    reducerPath: 'requests',
    tagTypes: ['users'],
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_URL}),
    endpoints: (build) => ({
        getRequests: build.query({
            query: (arr) => `/users?requests=${arr.join(',')}`,
            providesTags: ['users']
        }),
        cancelRequest: build.mutation({
            query:(arg) => ({
                url: `/request/mycancel`,
                method: 'PATCH',
                body: arg
            }),
            invalidatesTags: ['users']
        })
    })
})


export const {useGetRequestsQuery, useCancelRequestMutation} = requestsSlice


