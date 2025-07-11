import api from "../../app/context/apinterceptor";

// Common API
export const apiCall = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE", params?: any) => {
    try {
        const response = await api({
            url,
            method,
            ...(method === "GET" ? { params } : { data: params }),
        });
        return response;
    } catch (error) {
        throw error;
    }
};
