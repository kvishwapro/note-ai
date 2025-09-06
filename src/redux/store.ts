import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import sharingReducer from "./slices/sharingSlice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        sharing: sharingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
