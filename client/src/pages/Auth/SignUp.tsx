import styles from "./SignUp.module.css"; // Importando o CSS module

export function SignUp() {
  return (
    <div className={styles.wrapper}>
      {/* Seção esquerda com a imagem */}
      <div className={styles.leftSection}>
        <img
          src="warren-fNUNt9w3m-Q-unsplash 2.jpg"
          alt="Job Hunt Illustration"
          className={styles.image}
        />
      </div>
      {/* Seção direita com o formulário */}
      <div className={styles.rightSection}>
        <h1 className={styles.title}>Registar Conta</h1>
        <form className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Nome
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="Nome"
          />

          <label htmlFor="lastName" className={styles.label}>
            Apelido
          </label>
          <input
            type="text"
            id="lastName"
            className={styles.input}
            placeholder="Apelido"
          />

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Email"
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
          />

          <button type="submit" className={styles.button}>
            Registar conta
          </button>
        </form>
      </div>
    </div>
  );
}
