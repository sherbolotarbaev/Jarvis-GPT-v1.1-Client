import axios from "axios";
import { getCookieValue } from "@/lib/utils/cookies";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 15000,
  });

  instance.interceptors.request.use(async (config) => {
    const accessToken = await getCookieValue("access_token");

    if (accessToken) {
      config.headers.Cookie = `access_token=${encodeURIComponent(accessToken)}`;
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
