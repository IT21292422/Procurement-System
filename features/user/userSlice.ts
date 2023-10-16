import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {UserState} from '../../config/interfaces'

/*
This is the initial state of the user when trying to login to the system
*/
const initialUserState:UserState = {
  userName: null,
  isLoading: true,
  userType: null,
};

/*
This is act as observe pattern through out the program
and it will provide logUser,logOut,setLoading,setUserType
works as singleton pattern
*/
export const userSlice = createSlice({
  name: "user",
  initialState:initialUserState,
  reducers: {
    logUser: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
    logOut: (state) => {
      state.userName = null;
      state.userType = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserType: (state, action: PayloadAction<string | null>) => {
      state.userType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logUser, logOut, setLoading, setUserType } = userSlice.actions;

export default userSlice.reducer;
