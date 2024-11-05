import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
];

export default function Navbar() {
  const { data }: any = useSession();
  const { pathname } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);
  console.log(data);

  return (
    <div className={styles.navbar}>
      <h2>Musstore.</h2>
      <div className={styles.navbar__nav}>
        {NavItems.map((item, index) => (
          <Link
            href={item.url}
            className={`${styles.navbar__nav__item} ${
              pathname === item.url && styles.navbar__nav__item__active
            }`}
            key={index}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__cart}>
            <Link href={"/cart"}>
              <i
                className={`bx bx-shopping-bag ${styles.navbar__user__cart__icon}`}
              />
            </Link>
          </div>
          <div className={styles.navbar__user__profile}>
            {data?.user?.image ? (
              <div className={styles.navbar__user__profile__info}>
                <p>Hi, {data?.user?.name.split(" ")[0].toLowerCase()}</p>
                <Image
                  width={30}
                  height={30}
                  src={data?.user?.image}
                  alt={data?.user?.name}
                  className={styles.navbar__user__profile__image}
                  onClick={() => setDropdownUser(!dropdownUser)}
                />
              </div>
            ) : (
              <i className="bx bx-user" />
            )}
            <div
              className={`${styles.navbar__user__profile__dropdown} ${
                dropdownUser && styles.navbar__user__profile__dropdown__active
              }`}
            >
              <Link href={"/member/profile"}>
                <button
                  className={styles.navbar__user__profile__dropdown__item}
                >
                  Profile
                </button>
              </Link>
              <Link href={"/profile"}>
                <button
                  className={styles.navbar__user__profile__dropdown__item}
                >
                  Favorites
                </button>
              </Link>
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className={styles.navbar__button}
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
