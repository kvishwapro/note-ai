import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import sharingReducer from "./slices/sharingSlice";
import aiReducer from "./slices/aiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        sharing: sharingReducer,
        ai: aiReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
