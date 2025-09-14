import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/src/libs/axios";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authLogin = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },
);

const authRegister = createAsyncThunk(
    "auth/register",
    async (credentials: { email: string; password: string }) => {
        const response = await api.post("/auth/register", credentials);
        return response.data;
    },
);

const authOtpVerification = createAsyncThunk(
    "auth/otp-verification",
    async (credentials: { email: string; otp: string }) => {
        const response = await api.post("/auth/verify-otp", credentials);
        return response.data;
    },
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                state.error = null;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.error = action.payload as string || "Failed to login";
            });


        builder
            .addCase(authRegister.pending, (state) => {
                state.error = null;
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(authRegister.rejected, (state, action) => {
                state.error = action.payload as string || "Failed to register";
            });

        builder
            .addCase(authOtpVerification.pending, (state) => {
                state.error = null;
            })
            .addCase(authOtpVerification.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(authOtpVerification.rejected, (state, action) => {
                state.error = action.payload as string || "Failed to verify OTP";
            });
    },
});


export const { } = authSlice.actions;

export default authSlice.reducer;