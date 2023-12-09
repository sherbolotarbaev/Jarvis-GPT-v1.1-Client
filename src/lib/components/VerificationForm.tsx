"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/../api";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "@/lib/components/Button";
import { CloseSvg } from "@/lib/assets/svg";
import styles from "@/lib/styles/Form.module.scss";

type FormData = {
  code: string;
};

export default function VerificationForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const code = watch("code");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleLogout = async () => {
    try {
      await API.auth.logOut();
      router.push("/login");
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    }
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const data = await API.auth.emailVerification(formData);

      if (data.success) {
        successNotification("Successfully verified");
        router.push("/");
      }
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>Enter your code</h2>

          <span className={styles.info}>
            Check your email for a six-digit verification code. It should arrive
            shortly for you to complete the process.
          </span>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <span className={styles.label}>Code</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="123456"
                  {...register("code", {
                    required: "Code address required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter a valid six-digit code",
                    },
                    minLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("code")}
                  style={
                    !isLoading && code && code.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>

              {errors.code && (
                <span className={styles.error}>{errors.code.message}</span>
              )}
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              Continue
            </Button>

            <span className={styles.link} onClick={handleLogout}>
              Back to Home page ?
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
