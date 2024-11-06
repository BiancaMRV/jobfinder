import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";

export default function LogIn() {
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
          <div className={styles.logo}>AMU</div>
          <div className={styles.back}>
            <a href="/" className={styles.buttonSecondary}>
              Back to website
            </a>
          </div>
        </div>

        <div className={styles.title}>
          <h1>Explore. Sonhe. Descubra.</h1>
          <h3>Conectando seus sonhos às melhores oportunidades</h3>
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.formContainer}>
          <h1>Welcome Back!</h1>
          <p>
            Dont have an account? Create one!{" "}
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>

          <form method="POST" autoComplete="off" noValidate>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                name="email"
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
