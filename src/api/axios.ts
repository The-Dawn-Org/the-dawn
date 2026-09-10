import axios from "axios";

// Relative by default so calls stay same-origin: the vite proxy handles them in
// dev, nginx forwards them to the API in the built image. An absolute value is
// only needed to bypass that proxy.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/",
});
