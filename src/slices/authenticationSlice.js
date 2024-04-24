import { createSlice } from "@reduxjs/toolkit";
import getCookie from "../utils/getCookie";

const loadAuthenticationState = () => {
  const token = getCookie("token");
  return token ? true : false;
};

const getAuthUserInfoFromCookieStorage = () => {
  const authUser = getCookie("authUser");
  return authUser ? JSON.parse(authUser) : null;
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: loadAuthenticationState(),
    authUser: getAuthUserInfoFromCookieStorage(),
  },
  reducers: {
    checkAuthentication: (state) => {
      state.isAuthenticated = loadAuthenticationState();
    },
    getAuthUserInfo: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { checkAuthentication, getAuthUserInfo } = authenticationSlice.actions;
export default authenticationSlice.reducer;
