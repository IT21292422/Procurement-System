// \contexts\store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/count/counterSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer
  }
})
