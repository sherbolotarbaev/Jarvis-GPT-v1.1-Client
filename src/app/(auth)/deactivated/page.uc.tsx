"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Banner from "../_components/Banner";
import styles from "@/lib/styles/Auth.module.scss";

export default function DeactivatedClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.title} style={{ color: "#ff2e2e" }}>
              Account Deactivated
            </h1>

            <p className={styles.desc}>
              We regret to inform you that your account has been deactivated. If
              you believe this is in error, please contact our support team for
              assistance.
            </p>

            <Link className={styles.link} href="/login">
              Return to Log in?
            </Link>
          </div>
        </div>

        <Banner />
      </div>
    </>
  );
}
