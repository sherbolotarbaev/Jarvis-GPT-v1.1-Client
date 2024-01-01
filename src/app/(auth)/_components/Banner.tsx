"use client";

import styles from "@/lib/styles/Auth.module.scss";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>
        THE FUTURE IS HERE <br />
        <span>YOUR AI - HELPER ALWAYS WITH YOU</span>
      </div>
    </div>
  );
}
