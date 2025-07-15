import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// base url and header
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: dynamically send req
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.method !== "get" && config.method !== "GET") {
            config.data = {
                ...config.data,
            };
        } else {
            config.params = {
                ...config.params,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: response handler
api.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;
