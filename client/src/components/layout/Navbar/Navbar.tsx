import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Bell, UserPen, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import cloudlogo from "../../../assets/cloudlogo.svg";
import { BACKEND_URL } from "../../../utils/const";

interface User {
  firstname: string;
  lastname: string;
}

export default function Navbar() {
  const [user, setUsers] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(BACKEND_URL + "/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userdata = await response.json();
      setUsers(userdata);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftnavbar}>
        <div className={styles.logo}>
          <img src={cloudlogo} alt="Logo" width={35} />
        </div>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <Menu color="#6e54b5" size={28} />
      </button>
      <div className={`${styles.centernavbar} ${menuOpen ? styles.open : ""}`}>
        <Link className={styles.link} to="/">
          Find Jobs
        </Link>
        <Link className={styles.link} to="/about">
          About Us
        </Link>
      </div>
      <div className={styles.rightnavbar}>
        <Link className={styles.link} to="/notifications">
          <Bell size={24} />
        </Link>
        <Link className={styles.link} to="/profile">
          <UserPen size={24} />
        </Link>
      </div>
    </nav>
  );
}
