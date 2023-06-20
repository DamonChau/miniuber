/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import type { Users } from "../../models/type";
import type { RootState } from "../";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
} as {
  user: null | Users;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setLoggedSession: (state, action: PayloadAction<any>) => {
      try {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      } catch (error) {
        console.log(error);
      }
    },
    setLoggedUser: (state, action: PayloadAction<any>) => {
      try {
        state.user = action.payload;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { logout, setLoggedSession, setLoggedUser } = slice.actions;
export default slice.reducer as Reducer<typeof initialState>;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLoggedUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRefreshToke = (state: RootState) => state.auth.refreshToken;
