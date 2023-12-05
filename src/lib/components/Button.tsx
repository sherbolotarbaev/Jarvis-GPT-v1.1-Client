"use client";

import { useRouter } from "next/navigation";
import { LoadSvg } from "../assets/svg";
import styles from "../styles/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  style?: keyof TStyles;
  disabled?: boolean;
  type: keyof TTypes;
  load: boolean | string;
  onClick?: () => void;
  redirect?: string;
}

type TStyles = {
  google: string;
};

type TTypes = {
  button: string;
  submit: string;
};

export default function Button({
  children,
  style,
  disabled,
  type,
  load,
  onClick,
  redirect,
}: ButtonProps) {
  const router = useRouter();

  const redirectToPage = (path: string) => {
    router.push(path);
  };

  const renderButtonContent = () => {
    if (load === true) {
      return (
        <LoadSvg
          className={styles.load}
          style={!style ? { fill: "rgb(235, 87, 87)" } : undefined}
        />
      );
    }

    if (typeof load === "string") {
      return (
        <>
          <LoadSvg
            className={styles.load}
            style={!style ? { fill: "rgb(235, 87, 87)" } : undefined}
          />
          {load}
        </>
      );
    }

    return children;
  };

  const buttonClassName = [
    styles.button,
    style && styles[style],
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={load === true || disabled}
      onClick={onClick ? onClick : () => redirect && redirectToPage(redirect)}
      className={buttonClassName}>
      {renderButtonContent()}
    </button>
  );
}
