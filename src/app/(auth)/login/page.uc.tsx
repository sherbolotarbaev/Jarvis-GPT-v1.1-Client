"use client";

import LoginForm from "../_components/form/LoginForm";
import Banner from "../_components/Banner";
import styles from "@/lib/styles/Auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <LoginForm />
        </div>

        <Banner />
      </div>
    </>
  );
}
