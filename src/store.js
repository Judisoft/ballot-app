import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    }
});

export default store;