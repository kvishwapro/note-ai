import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const createApiClient = (
    getToken: () => Promise<string | null>,
): AxiosInstance => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Add request interceptor to include Bearer token
    client.interceptors.request.use(async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return client;
};

export const api = createApiClient(() => {
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };
    
    const token = getCookie("token");
    return token ? Promise.resolve(token) : Promise.resolve(null);
});

// Export the factory function for creating custom instances
export { createApiClient };
