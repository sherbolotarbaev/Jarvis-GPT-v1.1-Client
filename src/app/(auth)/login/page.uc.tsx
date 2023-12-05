"use client";

import LoginForm from "../_components/form/LoginForm";
import styles from "@/lib/styles/Auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.left}>
          <LoginForm />
        </div>

        <div className={styles.right}>
          <div className={styles.title}>
            THE FUTURE IS HERE <br />
            <span>YOUR AI - HELPER ALWAYS WITH YOU</span>
          </div>
        </div>
      </div>
    </>
  );
}
