"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useMe } from "../hooks/useMe";
import Link from "next/link";
import * as API from "@/../api";
import { errorNotification } from "../utils/notification";
import {
  ChatSvg,
  DotsSvg,
  HistorySvg,
  LoadSvg,
  LogoutSvg,
  SettingsSvg,
  UserSvg,
} from "../assets/svg";
import styles from "@/lib/styles/Header.module.scss";

type Link = {
  path: string;
  name: string;
  icon?: React.ReactElement;
  tag?: string;
};

interface Links {
  one: Link[];
  two: Link[];
}

export default function Header() {
  const me = useMe();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const handleOpenBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await API.auth.logOut();
      router.push("/login");
    } catch (e: any) {
      errorNotification("Failed to log out");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const links: Links = {
    one: [
      {
        path: "/settings/profile",
        name: "Profile",
        icon: (
          <UserSvg style={{ fontSize: "1.15rem", fill: "rgb(55, 53, 47)" }} />
        ),
      },
      {
        path: "/settings",
        name: "Settings",
        icon: (
          <SettingsSvg
            style={{ fontSize: "1.15rem", fill: "rgb(55, 53, 47)" }}
          />
        ),
      },
    ],
    two: [
      {
        path: "/chat",
        name: "Chat",
        icon: (
          <ChatSvg style={{ fontSize: "1.15rem", fill: "rgb(55, 53, 47)" }} />
        ),
      },
      {
        path: "/history",
        name: "History",
        icon: (
          <HistorySvg
            style={{ fontSize: "1.15rem", fill: "rgb(55, 53, 47)" }}
          />
        ),
        tag: "new",
      },
    ],
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.burger_menu} ref={burgerMenuRef}>
          <DotsSvg
            className={isOpen ? `${styles.icon} ${styles.active}` : styles.icon}
            onClick={handleOpenBurgerMenu}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className={
              isOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`
            }>
            <div className={styles.links}>
              {links.one.map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  onClick={() => setIsOpen(!isOpen)}
                  className={
                    pathname === link.path
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }>
                  {link.icon && link.icon} {link.name}
                  {link.tag && <span className={styles.tag}>{link.tag}</span>}
                </Link>
              ))}
            </div>

            <div className={styles.devider}>
              <hr />
            </div>

            <div className={styles.links}>
              {links.two.map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  onClick={() => setIsOpen(!isOpen)}
                  className={
                    pathname === link.path
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }>
                  {link.icon && link.icon} {link.name}
                  {link.tag && <span className={styles.tag}>{link.tag}</span>}
                </Link>
              ))}
            </div>

            {me && (
              <>
                <div className={styles.devider}>
                  <hr />
                </div>

                <div className={styles.links}>
                  <button
                    className={
                      isLoading
                        ? `${styles.link} ${styles.disabled}`
                        : styles.link
                    }
                    onClick={handleLogout}
                    disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoadSvg
                          className={styles.load}
                          style={{
                            fontSize: "1.15rem",
                            fill: "rgb(55, 53, 47)",
                          }}
                        />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <LogoutSvg
                          style={{
                            fontSize: "1.15rem",
                            fill: "rgb(55, 53, 47)",
                          }}
                        />
                        Log out
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
