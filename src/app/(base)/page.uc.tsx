"use client";

import Account from "@/lib/components/Account";
import styles from "@/lib/styles/Home.module.scss";

export default function HomeClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <Account />
      </div>
    </>
  );
}
