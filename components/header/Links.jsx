"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./links.module.css";

const Links = ({ href, children }) => {
  const pathName = usePathname();
  return (
    <Link href={href} className={`${pathName === href ? styles.active : ""}`}>
      {children}
    </Link>
  );
};

export default Links;
