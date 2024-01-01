"use client";

import ResetForm from "../../_components/form/ResetForm";
import Banner from "../../_components/Banner";
import styles from "@/lib/styles/Auth.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <ResetForm />
        </div>

        <Banner />
      </div>
    </>
  );
}
