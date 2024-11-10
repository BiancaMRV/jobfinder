import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Bell, UserPen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftnavbar}>
        <div className={styles.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" fill="#6b46c1" />
            <path
              d="M160,190 C160,170 180,160 200,160 C220,160 240,170 240,190 C260,190 280,200 280,220 C280,240 260,250 240,250 L160,250 C140,250 120,240 120,220 C120,200 140,190 160,190Z"
              fill="white"
            />
            <circle cx="180" cy="140" r="8" fill="#e9d8fd" opacity="0.8">
              <animate
                attributeName="cy"
                values="140;130;140"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="210" cy="150" r="6" fill="#e9d8fd" opacity="0.6">
              <animate
                attributeName="cy"
                values="150;140;150"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="240" cy="145" r="4" fill="#e9d8fd" opacity="0.4">
              <animate
                attributeName="cy"
                values="145;135;145"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d="M170,130 L173,137 L180,140 L173,143 L170,150 L167,143 L160,140 L167,137 Z"
              fill="#faf5ff"
              opacity="0.9"
            />
            <path
              d="M230,120 L233,127 L240,130 L233,133 L230,140 L227,133 L220,130 L227,127 Z"
              fill="#faf5ff"
              opacity="0.7"
            />
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="url(#gradient)"
              stroke-width="4"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#e9d8fd", stopOpacity: 0.5 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#e9d8fd", stopOpacity: 0.1 }}
                />
              </linearGradient>
            </defs>
          </svg>
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
          <p className={styles.nome}>José Silva</p>
          <UserPen />
        </Link>
      </div>
    </nav>
  );
}
