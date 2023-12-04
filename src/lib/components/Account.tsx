"use client";

import React, { useEffect, useState } from "react";
import * as API from "@/../api";
import { errorNotification } from "@/lib/utils/notification";
import styles from "@/lib/styles/Account.module.scss";
import Image from "next/image";

export default function Account() {
  const [me, setMe] = useState<User | null>(null);

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

  return (
    <>
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
              <div className={styles.logo}></div>
            )}
          </div>

          <div className={styles.info_wrapper}>
            <div className={styles.name}>
              <h2 className={styles.full_name}>
                {me.firstName} {me.lastName}
              </h2>

              <span className={styles.username}>{me.username}</span>
            </div>

            <div className={styles.email}>{me.email}</div>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
