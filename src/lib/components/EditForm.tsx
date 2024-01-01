"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "../hooks/useMe";
import { SubmitHandler, useForm } from "react-hook-form";
import * as API from "@/../api";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "@/lib/components/Button";
import styles from "@/lib/styles/Form.module.scss";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  nationality?: string;
  bio?: string;
  phone?: string;
  [key: string]: string | undefined;
};

interface Props {}

export default function EditForm(props: Props) {
  const me = useMe();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);

    const editedFields: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (me && value !== me[key]) {
        editedFields[key] = value;
      }
    });

    try {
      const data: User = await API.auth.editMe(editedFields);

      if (data) {
        router.refresh();
        successNotification("Profile successfully updated");
      }
    } catch (e: any) {
      errorNotification(e.msg || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (me) {
      setValue("firstName", me.firstName);
      setValue("lastName", me.lastName);
      setValue("username", me.username);
      setValue("phone", me.phone);
      setValue("bio", me.bio);
      setValue("nationality", me.nationality);
    }
  }, [setValue, me]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className={styles.title}>Edit Profile</h2>

          <div className={styles.inputs_container}>
            <div className={styles.cupple}>
              <div className={styles.input_container}>
                <span className={styles.label}>First Name*</span>

                <div className={styles.input_wrapper}>
                  <input
                    type="text"
                    disabled={isLoading}
                    className={
                      isLoading
                        ? `${styles.input} ${styles.load}`
                        : styles.input
                    }
                    placeholder="Sherbolot"
                    {...register("firstName", {
                      required: "First Name cannot be empty",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid first name",
                      },
                      minLength: {
                        value: 2,
                        message:
                          "First Name must be at least 2 characters long",
                      },
                      maxLength: {
                        value: 64,
                        message: "Username cannot be longer than 80 characters",
                      },
                    })}
                  />
                </div>

                {errors.firstName && (
                  <span className={styles.error}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={styles.input_container}>
                <span className={styles.label}>Last Name*</span>

                <div className={styles.input_wrapper}>
                  <input
                    type="text"
                    disabled={isLoading}
                    className={
                      isLoading
                        ? `${styles.input} ${styles.load}`
                        : styles.input
                    }
                    placeholder="Arbaev"
                    {...register("lastName", {
                      required: "Last Name cannot be empty",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid last name",
                      },
                      minLength: {
                        value: 2,
                        message: "Last Name must be at least 2 characters long",
                      },
                      maxLength: {
                        value: 64,
                        message:
                          "Last Name cannot be longer than 50 characters",
                      },
                    })}
                  />
                </div>

                {errors.lastName && (
                  <span className={styles.error}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Username*</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="sherbolot"
                  {...register("username", {
                    required: "Username cannot be empty",
                    pattern: {
                      value: /^[a-zA-Z0-9_-]{3,16}$/,
                      message: "Invalid username",
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 80,
                      message: "Username cannot be longer than 80 characters",
                    },
                  })}
                />
              </div>

              {errors.username && (
                <span className={styles.error}>{errors.username.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Phone Number</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="996707888000"
                  {...register("phone", {
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
              </div>

              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Nationality</span>

              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${styles.input} ${styles.load}` : styles.input
                  }
                  placeholder="Kyrgyz"
                  {...register("nationality", {
                    minLength: {
                      value: 2,
                      message: "Nationality must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 300,
                      message:
                        "Nationality cannot be longer than 300 characters",
                    },
                  })}
                />
              </div>

              {errors.nationality && (
                <span className={styles.error}>
                  {errors.nationality.message}
                </span>
              )}
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Bio</span>

              <div className={styles.input_wrapper}>
                <textarea
                  disabled={isLoading}
                  className={
                    isLoading
                      ? `${styles.input} ${styles.textarea} ${styles.load}`
                      : `${styles.input} ${styles.textarea}`
                  }
                  placeholder="Enter your bio..."
                  {...register("bio", {
                    minLength: {
                      value: 5,
                      message: "Bio must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 370,
                      message: "Bio cannot be longer than 370 characters",
                    },
                  })}
                />
              </div>

              {errors.bio && (
                <span className={styles.error}>{errors.bio.message}</span>
              )}
            </div>

            <Button load={isLoading} type="submit">
              Update
            </Button>
          </div>

          <span className={styles.info}></span>
        </form>
      </div>
    </>
  );
}
