"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as API from "@/../api";
import Image from "next/image";
import { errorNotification } from "@/lib/utils/notification";
import Button from "./Button";
import { LoadSvg, LogoutSvg } from "../assets/svg";
import styles from "@/lib/styles/Account.module.scss";

export default function Account() {
  const router = useRouter();

  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMe = async () => {
      try {
        const data: User = await API.auth.getMe();

        if (data) {
          setMe(data);
        }
      } catch (e: any) {
        errorNotification("Something went wrong");
        console.error(e);
      }
    };

    getMe();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await API.auth.logOut();
      router.push("/login");
    } catch (e: any) {
      errorNotification("Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.account_wrapper}>
        {me ? (
          <div className={styles.account}>
            <div className={styles.logo_wrapper}>
              {me.photo ? (
                <Image
                  className={styles.logo}
                  src={me.photo as string}
                  alt={`${me.firstName} ${me.lastName}`}
                  width={50}
                  height={50}
                />
              ) : (
                <div className={styles.logo}>{me.firstName[0]}</div>
              )}
            </div>

            <div className={styles.info_wrapper}>
              <div className={styles.name}>
                <h2 className={styles.full_name}>
                  {me.firstName} {me.lastName}
                </h2>

                <span className={styles.username}>@{me.username}</span>
              </div>

              <div className={styles.email}>{me.email}</div>

              {me.phone && <div className={styles.phone}>{me.phone}</div>}
            </div>

            <div className={styles.button_wrapper}>
              <Button
                load={isLoading ? "Logging out..." : false}
                type="button"
                onClick={handleLogout}
                disabled={isLoading}>
                <LogoutSvg style={{ fontSize: "1.05rem", fill: "#ff4747" }} />
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <LoadSvg className={styles.load} />
        )}
      </div>
    </>
  );
}
