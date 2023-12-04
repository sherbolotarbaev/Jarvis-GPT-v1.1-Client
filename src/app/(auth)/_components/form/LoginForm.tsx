"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/../api";
import { getCookieValue } from "@/lib/utils/cookies";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "@/lib/components/Button";
import { CloseSvg, GoogleSvg } from "@/lib/assets/svg";
import styles from "@/lib/styles/Form.module.scss";

type FormData = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleOAuthUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/google/callback`
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const emailOrUsername = watch("emailOrUsername");
  const password = watch("password");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    try {
      const data: User = await API.auth.logIn(formData);

      if (data) {
        successNotification(`Successfully logged in as a ${data.email}`);
        router.push(next);
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
        setValue("emailOrUsername", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>Log in</h2>

          <div className={styles.inputs_container}>
            <a href={`${googleOAuthUrl}`}>
              <Button load={isLoading} type="button" style="google">
                <GoogleSvg style={{ fontSize: "1.2rem" }} /> Continue with
                Google
              </Button>
            </a>

            <div className={styles.devider}>
              <hr />
              <span>or</span>
              <hr />
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Email address or username</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Enter your email address or username..."
                  {...register("emailOrUsername", {
                    required: "Email address or username required",
                    pattern: {
                      value:
                        /^[\p{L}\d]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$|^[\p{L}\d\s]+$/u,
                      message: "Invalid email adress or userame",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("emailOrUsername")}
                  style={
                    !isLoading && emailOrUsername && emailOrUsername.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>

              {errors.emailOrUsername && (
                <span className={styles.error}>
                  {errors.emailOrUsername.message}
                </span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Password</span>

              <div className={styles.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  autoComplete="off"
                  className={
                    isLoading
                      ? `${styles.input} ${styles.load} ${styles.password}`
                      : `${styles.input} ${styles.password}`
                  }
                  placeholder="Enter your password..."
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Password cannot contain more than 16 characters",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("password")}
                  style={
                    !isLoading && password && password.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>

              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              Continue with email or name
            </Button>

            <Link className={styles.link} href="/password/forgot">
              Forgot password?
            </Link>
          </div>

          <span className={styles.info}>
            By clicking “Continue with Google/Email” above, you acknowledge that
            you have read and understood, and agree to {"Jarvis GPT's"} Terms &
            Conditions and Privacy Policy.
          </span>
        </form>
      </div>
    </>
  );
}
