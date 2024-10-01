import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo.png";
import styles from "./header.module.css";
import HeaderBg from "./HeaderBg";
import Links from "./Links";

const Header = () => {
  return (
    <>
      <HeaderBg />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="logo" priority />
          Next level food
        </Link>
        <ul className={styles.nav}>
          <li>
            <Links href="/meals">Meals</Links>
          </li>
          <li>
            <Links href="/community">Community</Links>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
