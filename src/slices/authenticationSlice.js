import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utils/getCookie";

const loadAuthenticationState = () => {
  const token = getCookie("token");
  return token ? true : false;
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: loadAuthenticationState(),
  },
  reducers: {
    checkAuthentication: (state) => {
      state.isAuthenticated = loadAuthenticationState();
    },
  },
});

export const { checkAuthentication } = authenticationSlice.actions;
export default authenticationSlice.reducer;
