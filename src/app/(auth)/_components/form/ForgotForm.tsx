"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/../api";
import { getCookieValue } from "@/lib/utils/cookies";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "@/lib/components/Button";
import { CloseSvg } from "@/lib/assets/svg";
import styles from "@/lib/styles/Form.module.scss";

type FormData = {
  email: string;
};

export default function ForgotForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const email = watch("email");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const data = await API.auth.forgotPassword(formData);

      if (data) {
        successNotification(data);
        router.push("/login");
      }
    } catch (e: any) {
      errorNotification("Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = await getCookieValue("email");

      if (cookieEmail) {
        setValue("email", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>Forgot Password?</h2>

          <span className={styles.info}>
            Enter the email address you used when you joined and we'll send you
            a link to reset your password.
          </span>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <span className={styles.label}>Email address</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your email address..."
                  {...register("email", {
                    required: "Email address required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("email")}
                  style={
                    !isLoading && email && email.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <Button type="submit" load={isLoading}>
              Send reset link
            </Button>

            <Link className={styles.link} href="/login">
              Log in?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
