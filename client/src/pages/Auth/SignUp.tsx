import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import useMediaQuery from "../../utils/useMediaQuery";

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
    location: "", // Novo campo para localização da empresa
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
      // Validação de senha
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Cadastro do usuário
      const response = await fetch("http://localhost:3000/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("formData", formData);

      if (!response.ok) {
        const error = await response.text();
        console.log("Erro do backend:", error);
        toast.error(error);
        setError(error);
        setLoading(false);
        return;
      }

      const responseJson = await response.json();
      console.log("responseJson", responseJson);
      localStorage.setItem("user", responseJson.userId);

      // Se for uma empresa, cria o registro na tabela companies
      if (formData.role === "company") {
        try {
          console.log("Criando empresa com nome:", formData.firstName);

          const companyResponse = await fetch(
            "http://localhost:3000/companies",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                name: formData.name, // Nome da empresa
                email: formData.email, // Email da empresa
                location: formData.location || "", // Localização (pode estar vazio)
              }),
            }
          );

          if (!companyResponse.ok) {
            console.error(
              "Erro ao criar empresa:",
              await companyResponse.text()
            );
            toast.error(
              "Conta criada, mas houve um problema ao salvar os detalhes da empresa"
            );
          } else {
            console.log("Empresa criada com sucesso!");
          }
        } catch (companyError) {
          console.error("Erro ao criar empresa:", companyError);
          toast.error(
            "Conta criada, mas não foi possível registrar os detalhes da empresa"
          );
        }
      }

      // Redireciona baseado no tipo de usuário
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
          {/* <div className={styles.back}>
            <a href="/" className={styles.buttonSecondary}>
              Back to website
            </a>
          </div> */}
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
                      name="firstName"
                      value={formData.firstName}
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
      <Toaster position="top-center" />
    </main>
  );
};
