import { api } from "../libs/axios";

// Define types for authentication
interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupData {
    full_name: string;
    email: string;
    password: string;
}

interface OTPVerification {
    email: string;
    otp: string;
}

interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        full_name: string;
    };
}

export const login = async (
    credentials: LoginCredentials,
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
};

export const signup = async (userData: SignupData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
};

export const verifyOTP = async (
    verificationData: OTPVerification,
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        "/auth/verify-otp",
        verificationData,
    );
    return response.data;
};

export const resendOTP = async (
    email: string,
): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/resend-otp", {
        email,
    });
    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};
