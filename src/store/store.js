import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        blogs: blogSlice,
        users: userSlice
    }
})

export default store