"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMe } from "../hooks/useMe";
import Modal from "./Modal";
import EditForm from "./EditForm";
import Button from "./Button";
import { LoadSvg } from "../assets/svg";
import styles from "@/lib/styles/Account.module.scss";

export default function Account() {
  const me = useMe();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.account_wrapper}>
        {me ? (
          <>
            <div className={styles.account}>
              <div className={styles.info_wrapper}>
                <div className={styles.info}>
                  <div className={styles.name}>
                    <h2 className={styles.full_name}>
                      {me.firstName} {me.lastName}
                    </h2>

                    <span className={styles.username}>@{me.username}</span>
                  </div>

                  <div className={styles.contact}>
                    <div className={styles.email}>{me.email}</div>

                    {me.phone && <div className={styles.phone}>{me.phone}</div>}
                  </div>
                </div>

                {me.bio && <p className={styles.bio}>{me.bio}</p>}
              </div>

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
                  <div className={styles.logo}>{me.firstName[0]}</div>
                )}
              </div>
            </div>

            <div className={styles.button_wrapper}>
              <Button
                load={false}
                type="button"
                style="white"
                onClick={handleOpenModal}>
                Edit profile
              </Button>
            </div>
          </>
        ) : (
          <LoadSvg className={styles.load} />
        )}
      </div>

      {me && (
        <Modal open={isOpen}>
          <EditForm />
        </Modal>
      )}
    </>
  );
}
