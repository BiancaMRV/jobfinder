import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import useMediaQuery from "../../utils/useMediaQuery";
import { BACKEND_URL } from "../../utils/const";

export const SignUp: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768)");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "jobSeeker",
    location: "",
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
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const dataToSend = { ...formData };

      if (formData.role === "company") {
        dataToSend.firstName = formData.name;
        dataToSend.lastName = "Company";
      }

      console.log("Dados a serem enviados:", dataToSend);

      const response = await fetch(BACKEND_URL + "/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Erro do backend:", errorText);
        toast.error(errorText);
        setError(errorText);
        setLoading(false);
        return;
      }

      const responseJson = await response.json();
      console.log("Resposta do signup:", responseJson);
      localStorage.setItem("user", responseJson.userId);

      if (formData.role === "company") {
        try {
          const companyData = {
            name: formData.name,
            email: formData.email,
            location: formData.location || "",
            description: "Company profile",
          };

          console.log("Dados da empresa a serem enviados:", companyData);

          // const companyResponse = await fetch(
          //   BACKEND_URL + "/companies",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     credentials: "include",
          //     body: JSON.stringify(companyData),
          //   }
          // );

          // const companyResponseText = await companyResponse.text();
          // console.log("Resposta da criação da empresa:", companyResponseText);

          // if (!companyResponse.ok) {
          //   console.error("Erro ao criar empresa:", companyResponseText);
          //   toast.error(
          //     "Conta criada, mas houve um problema ao salvar os detalhes da empresa"
          //   );
          // } else {
          //   console.log("Empresa criada com sucesso!");
          // }
        } catch (companyError) {
          console.error("Erro ao criar empresa:", companyError);
        }
      }

      if (formData.role === "jobSeeker") {
        toast.success(
          "Account created successfully, browse your dream jobs :)"
        );
        navigate("/");
      } else {
        toast.success("Account created successfully, make dreams come true :)");
        navigate("/companyprofile");
      }
    } catch (error) {
      console.error("Erro:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        toast.error("Error connecting to server");
      } else {
        toast.error(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
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
            <img src="./logo.svg" alt="Logo" width={70} />
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
            Already have an account?{" "}
            <Link to="/LogIn" className={styles.link}>
              Login
            </Link>
          </p>

          <form
            method="POST"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={styles.roleSelection}>
              <button
                type="button"
                className={`${styles.roleButton} ${
                  formData.role === "jobSeeker" ? styles.active : ""
                }`}
                onClick={() => setFormData({ ...formData, role: "jobSeeker" })}
              >
                Job Seeker
              </button>
              <button
                type="button"
                className={`${styles.roleButton} ${
                  formData.role === "company" ? styles.active : ""
                }`}
                onClick={() => setFormData({ ...formData, role: "company" })}
              >
                Company
              </button>
            </div>
            <div className={styles.name}>
              {formData.role === "jobSeeker" ? (
                <>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
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
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      minLength={2}
                      pattern="[A-Za-z]+"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      id="companyName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Company Name"
                      required
                      minLength={2}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Company Location"
                    />
                  </div>
                </>
              )}
            </div>

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

            <div className={styles.inputContainer}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className={styles.buttonPrimary}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
