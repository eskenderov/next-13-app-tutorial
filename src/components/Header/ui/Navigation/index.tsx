"use client";
import Link from "next/link";
import s from "./style.module.scss";
import { NavListType } from "./types";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export const HeaderNavigation = () => {
  const pathName = usePathname();
  const data: NavListType = [
    { title: "Home", to: "/" },
    { title: "Shop", to: "/shop" },
    { title: "Profile", to: "/profile" },
  ];

  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {data?.map(({ title, to }) => (
          <Link
            href={to}
            key={title}
            className={classNames(s.link, { [s.active]: pathName === to })}
          >
            {title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
