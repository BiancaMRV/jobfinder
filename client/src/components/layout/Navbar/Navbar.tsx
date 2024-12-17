import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Bell, UserPen } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftnavbar}>
        <div className={styles.logo}>
          <img src="./logo.svg" alt="Logo" width={35} />
        </div>
      </div>
      {isMobile && (
        <button
          className={styles.filtertogglebutton}
          onClick={() => setIsPopUpOpen(!isPopUpOpen)}
        ></button>
      )}
      <div className={styles.centernavbar}>
        <Link className={styles.link} to={"/"}>
          Find Jobs
        </Link>
        <Link className={styles.link} to={"/"}>
          Upload Job
        </Link>
        <Link className={styles.link} to={"/"}>
          About Us
        </Link>
      </div>
      <div className={styles.rightnavbar}>
        <Link className={styles.link} to={"/"}>
          <Bell size={24} />
        </Link>
        <Link className={styles.link} to={"/"}>
          <p className={styles.nome}>José Silva</p>
          <UserPen />
        </Link>
      </div>
    </nav>
  );
}
