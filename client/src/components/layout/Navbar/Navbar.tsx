import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Bell, UserPen } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  firstname: string;
  lastname: string;
}

export default function Navbar() {
  const [user, setUsers] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/user", {
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
          <img src="./logo.svg" alt="Logo" width={35} />
        </div>
      </div>
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
          <p className={styles.nome}>
            {user ? `${user.firstname} ${user.lastname}` : "Guest"}
          </p>
          <UserPen />
        </Link>
      </div>
    </nav>
  );
}
