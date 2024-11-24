import client from "./config/database";

const createUsers = `CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    currentJob VARCHAR(255),
    isWorking VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createSessions = `CREATE TABLE IF NOT EXISTS "sessions" (
    id TEXT PRIMARY KEY,
    user_id SERIAL references users(id),
    expires_at TIMESTAMP NOT NULL
)`;

const createPosts = `CREATE TABLE IF NOT EXISTS "posts" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags INTEGER[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createComments = `CREATE TABLE IF NOT EXISTS "comments" (
    id  SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id INTEGER,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createCompanies = `CREATE TABLE IF NOT EXISTS "companies" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createJobOffers = `CREATE TABLE IF NOT EXISTS "job_offers" (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,
    experience_level VARCHAR(50), 
    job_type VARCHAR(50),
    salary NUMERIC(10, 2),
    description TEXT NOT NULL,
    applicants_count INTEGER DEFAULT 0,
    company_id INTEGER NOT NULL references companies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createJobApplication = `CREATE TABLE IF NOT EXISTS "application" (
   id SERIAL PRIMARY KEY, 
   user_id VARCHAR(255) NOT NULL,
   job_offer_id INTEGER NOT NULL, 
   cover_letter TEXT NOT NULL, 
   resume TEXT NOT NULL,
   status VARCHAR(50) DEFAULT 'pending',
   company_id TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// serial- o valor é incrementado de linha para linha, primary siginifca que o valor é unico e nao pode ser nulo
async function createTables() {
  try {
    // assim executa tudo ao mesmo tempo ao invés de executar uma por uma
    const promises = [
      client.query(createUsers),
      client.query(createSessions),
      client.query(createPosts),
      client.query(createComments),
      client.query(createCompanies),
      client.query(createJobOffers),
      client.query(createJobApplication),
    ];
    await Promise.all(promises); // Espera todas as promises serem resolvidas
    console.log("Tables created"); // Output: Tables created
  } catch (error) {
    console.error("Error creating tables", error);
  }
}
async function dropTables() {
  try {
    const promises = [
      client.query("DROP TABLE IF EXISTS users CASCADE"),
      client.query("DROP TABLE IF EXISTS sessions CASCADE"),
      client.query("DROP TABLE IF EXISTS posts CASCADE"),
      client.query("DROP TABLE IF EXISTS comments CASCADE"),
      client.query("DROP TABLE IF EXISTS companies CASCADE"),
      client.query("DROP TABLE IF EXISTS job_offers CASCADE"),
      client.query("DROP TABLE IF EXISTS application CASCADE"),
    ];
    await Promise.all(promises);
    console.log("Tables dropped");
  } catch (error) {
    console.error("Error droping tables", error);
  }
}
// dropTables().then(() => {
//   createTables().then(() => {
//     process.exit(0);
//   });

await dropTables(); //so posso usar o await fora de uma funcao assincrona com o bun
await createTables();
client.end;
process.exit(0);
