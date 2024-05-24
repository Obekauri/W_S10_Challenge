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
  middleware: getDefault => getDefault().concat(
    usersApi.middleware,
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
