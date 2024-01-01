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
import { CloseSvg, GitHubSvg, GoogleSvg } from "@/lib/assets/svg";
import styles from "@/lib/styles/Form.module.scss";

type FormData = {
  emailOrUsername: string;
  password: string;
};

type IsLoading = {
  withEmailOrUsername: boolean;
  withGoogle: boolean;
  withGitHub: boolean;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [isLoading, setIsLoading] = useState<IsLoading>({
    withEmailOrUsername: false,
    withGoogle: false,
    withGitHub: false,
  });

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

  const handleGoogleOAuth = () => {
    setIsLoading((prevLoading) => ({
      ...prevLoading,
      withGoogle: true,
    }));

    try {
      window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/google/callback`,
        "_self"
      );
    } catch (e: any) {
      errorNotification("Something went wrong");
      console.error(e);
    }
  };

  const handleGitHubOAuth = () => {
    setIsLoading((prevLoading) => ({
      ...prevLoading,
      withGitHub: true,
    }));

    try {
      window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/github/callback`,
        "_self"
      );
    } catch (e: any) {
      errorNotification("Something went wrong");
      console.error(e);
    }
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading((prevLoading) => ({
      ...prevLoading,
      withEmailOrUsername: true,
    }));

    try {
      const data: User = await API.auth.logIn(formData);

      if (data) {
        successNotification(`Successfully logged in as a ${data.email}`);
        router.push(next);
      }
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading((prevLoading) => ({
        ...prevLoading,
        withEmailOrUsername: false,
      }));
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
          <h2 className={styles.title}>
            Log in to <span>Jarvis GPT</span>
          </h2>

          <div className={styles.inputs_container}>
            <Button
              load={isLoading.withGoogle}
              type="button"
              style="white"
              onClick={handleGoogleOAuth}>
              <GoogleSvg style={{ fontSize: "1.2rem" }} /> Continue with Google
            </Button>

            <Button
              load={isLoading.withGitHub}
              type="button"
              style="white"
              onClick={handleGitHubOAuth}>
              <GitHubSvg style={{ fontSize: "1.38rem" }} /> Continue with GitHub
            </Button>

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
                  disabled={isLoading.withEmailOrUsername}
                  className={
                    isLoading.withEmailOrUsername
                      ? `${styles.input} ${styles.load}`
                      : styles.input
                  }
                  placeholder="Enter your email address or username..."
                  {...register("emailOrUsername", {
                    required: "Email address or username required",
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: "Invalid email adress or userame",
                    },
                  })}
                />

                <CloseSvg
                  className={styles.clear}
                  onClick={() => handleClearInput("emailOrUsername")}
                  style={
                    !isLoading.withEmailOrUsername &&
                    emailOrUsername &&
                    emailOrUsername.length > 0
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
                  disabled={isLoading.withEmailOrUsername}
                  autoComplete="off"
                  className={
                    isLoading.withEmailOrUsername
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
                    !isLoading.withEmailOrUsername &&
                    password &&
                    password.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>

              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <Button
              load={isLoading.withEmailOrUsername ? "Logging in..." : false}
              type="submit"
              disabled={!isValid}>
              Continue with email or username
            </Button>

            <Link className={styles.link} href="/password/forgot">
              Forgot password?
            </Link>
          </div>

          <span className={styles.info}>
            By clicking “Continue with Google/GitHub/Email” above, you
            acknowledge that you have read and understood, and agree to
            {" Jarvis GPT's "}Terms & Conditions and Privacy Policy.
          </span>
        </form>
      </div>
    </>
  );
}
