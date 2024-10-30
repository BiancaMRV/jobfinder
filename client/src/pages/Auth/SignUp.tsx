import styles from "./SignUp.module.css";
// .. vai pra tras, .pasta onde estou
export function SignUp() {
  return (
    <>
      <div className={styles.container}>
        {/* Secção da Imagem */}

        <h1>Registar Conta</h1>
        <form action="">
          <label htmlFor="firstName">Nome</label>
          <input
            type="text"
            id="firstName"
            autoComplete="given-name"
            className={styles.firstName}
          />
          <label htmlFor="lastName">Apelido</label>
          <input
            type="text"
            id="lastName"
            autoComplete="family-name"
            className={styles.lastName}
          />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={styles.email} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className={styles.password} />
          <button>Registar conta</button>
        </form>
      </div>
    </>
  );
}
