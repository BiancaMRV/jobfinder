import styles from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import { Sparkle } from "lucide-react";
import Searchbar from "../Searchbar/Searchbar";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar></Navbar>
      <div className={styles.bottomheader}>
        <h1 className={styles.title}>
          Find your dream job here <Sparkle size={24} />
        </h1>
        <Searchbar></Searchbar>
      </div>
    </header>
  );
}
