"use client";

import { errorNotification } from "@/lib/utils/notification";
import instance from "../core/axios";
import { LoginDto } from "./dto";

export const logIn = async (dto: LoginDto) => {
  try {
    return (await instance.post("/login", dto)).data;
  } catch (e: any) {
    errorNotification(e.response.data.message);
  }
};

export const logOut = async () => {
  try {
    await instance.post("/logout");
  } catch (e: any) {
    errorNotification(e.response.data.message);
  }
};

export const getMe = async () => {
  try {
    return (await instance.get("/me")).data;
  } catch (e: any) {
    errorNotification(e.response.data.message);
  }
};
