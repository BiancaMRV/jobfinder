import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useMediaQuery from "../../utils/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LogIn() {
  const isMobile = useMediaQuery("(max-width:768)");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.log("Erro do backend:", error);
        toast.error(error);
        setError(error);
        return;
      } else {
        toast.success("Login successfully");
        console.log("1", 1);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        toast.error("Error connecting to server");
      } else {
        toast.error("Error connecting to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <div className={styles.imgContainer}>
          <img
            src="WhatsApp Image 2024-11-04 at 03.39.22.jpeg"
            alt="Purple and orange cloudy sky background"
            loading="lazy"
          />
        </div>

        <div className={styles.top}>
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
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
          <div className={styles.back}>
            <a href="/" className={styles.buttonSecondary}>
              Back to website
            </a>
          </div>
        </div>

        <div className={styles.title}>
          <h1>Unlock Opportunities, Fulfill Your Career Dreams.</h1>
          <h3>Your path to success starts here.</h3>
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.formContainer}>
          <h1>Welcome Back!</h1>
          <p>
            Dont have an account? Create one!
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>

          <form
            method="POST"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                autoComplete="username"
              />
            </div>

            <div className={styles.inputContainer}>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className={styles.buttonPrimary}>
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
