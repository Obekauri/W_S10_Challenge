import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './usersApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    // add your reducer(s) here
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,  // Disable serializable check middleware
  }).concat(
    usersApi.middleware,
    // Add other middleware here if needed
  ),
})

export const store = resetStore()
