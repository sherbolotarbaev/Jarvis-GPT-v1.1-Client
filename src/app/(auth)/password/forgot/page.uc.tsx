"use client";

import ForgotForm from "../../_components/form/ForgotForm";
import styles from "@/lib/styles/Auth.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.left}>
          <ForgotForm />
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
