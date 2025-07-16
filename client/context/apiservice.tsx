import api from "./apinterceptor";

export const apiCall = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  params?: Record<string, unknown>
): Promise<unknown> => { // Remains Promise<unknown>
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
