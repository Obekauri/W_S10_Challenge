import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// The usersApi slice - handling API interactions for user data
export const usersApi = createApi({
  // Unique key that defines where the data will be stored in the Redux state
  reducerPath: 'usersApi',
  // Setting up the base query with the base URL pointing to the backend service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
  // Placeholder for our endpoint definitions - to be implemented
  tagTypes: ['History'],
  endpoints: builder => ({
    // Endpoints will be defined here in future steps
    getUsers: builder.query({
        query: () => 'history',
        providesTags: ['History'],
    }),
    createUser: builder.mutation({
        query: data => ({
          url: 'order',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['History'], // Invalidate 'Users' tag upon mutation
    }),
    
  })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
} = usersApi
