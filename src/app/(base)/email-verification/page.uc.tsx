"use client";

import VerificationForm from "@/lib/components/VerificationForm";
import styles from "@/lib/styles/EmailVerification.module.scss";

export default function EmailVerificationClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <VerificationForm />
      </div>
    </>
  );
}
