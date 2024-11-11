import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

export default function SignUp() {
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
            <img src="./logo.svg" alt="Logo" width={70} />
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
          <h1>Create an account</h1>
          <p>
            Already have an account?
            <Link to="/LogIn" className={styles.link}>
              Login
            </Link>
          </p>

          <form method="POST" autoComplete="off" noValidate>
            <div className={styles.name}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  minLength={2}
                  pattern="[A-Za-z]+"
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  minLength={2}
                  pattern="[A-Za-z]+"
                />
              </div>
            </div>

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

            <div className={styles.inputContainer}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.terms}>
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a>
              </label>
            </div>

            <button type="submit" className={styles.buttonPrimary}>
              Create Account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
