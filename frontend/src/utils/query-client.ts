import axios from "axios";

const axiosContext = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

axiosContext.interceptors.request.use(
  (request) => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const queryClient = axiosContext;
