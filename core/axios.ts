import axios from "axios";
import { getCookieValue } from "@/lib/utils/cookies";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 15000,
  });

  instance.interceptors.request.use((config) => {
    const session = getCookieValue("session");

    if (session) {
      config.headers.Cookie = `session=${encodeURIComponent(session)}`;
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
