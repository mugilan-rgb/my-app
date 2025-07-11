import axios from "axios";

// base url and header
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor Dynamic send req and res
api.interceptors.request.use(
    (config: any) => {
        // Inject values into the request body
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


// Response Interceptor
api.interceptors.response.use(
    (response: any) => response.data,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;
