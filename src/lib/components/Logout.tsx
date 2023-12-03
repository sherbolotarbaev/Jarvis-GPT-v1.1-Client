"use client";

import React, { useState } from "react";
import * as API from "@/../api";
import { errorNotification } from "@/lib/utils/notification";
import Button from "./Button";
import { LogoutSvg } from "../assets/svg";

export default function Logout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await API.auth.logOut();
    } catch (e: any) {
      errorNotification("Failed to log out");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        load={isLoading ? "Logging out..." : false}
        type="button"
        onClick={handleLogout}
        disabled={isLoading}>
        <LogoutSvg style={{ fontSize: "1.15rem", fill: "#ff4747" }} /> Log out
      </Button>
    </>
  );
}
