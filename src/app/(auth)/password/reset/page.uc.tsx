"use client";

import ResetForm from "../../_components/form/ResetForm";
import styles from "@/lib/styles/Auth.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.left}>
          <ResetForm />
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
