"use client";

import React, { createContext, useMemo, useState, useEffect } from "react";
import * as API from "@/../api";
import { errorNotification } from "../utils/notification";
import { getCookieValue } from "../utils/cookies";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<{ me: User | null }>({
  me: null,
});

export const UserProvider = ({ children }: Props) => {
  const [me, setMe] = useState<User | null>(null);

  const initializeUser = async () => {
    try {
      const isLoggedIn = (await getCookieValue("isLoggedIn")) === "true";

      if (isLoggedIn) {
        const data: User = await API.auth.getMe();
        setMe(data);
      }
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  const value = useMemo(() => ({ me }), [me]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
