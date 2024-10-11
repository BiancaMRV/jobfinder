import client from "./config/database";

const createUsers = `CREATE TABLE IF NOT EXISTS "users" (
    id TEXT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    currentJob VARCHAR(255) NOT NULL,
    isWorking VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
const createSessions = `CREATE TABLE IF NOT EXISTS "sessions" (
    id  Text NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    foreign key (user_id) references users(id)
)`;

const createPosts = `CREATE TABLE IF NOT EXISTS "posts" (
    id  SERIAL PRIMARY KEY,
    title  VARCHAR(255) NOT NULL,
    content  TEXT NOT NULL,
    tags  INTEGER[],
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createComments = `CREATE TABLE IF NOT EXISTS "comments" (
    id  SERIAL PRIMARY KEY,
    post_id INTEGER,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createCompanies = `CREATE TABLE IF NOT EXISTS "companies" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
const createJobOffers = `CREATE TABLE IF NOT EXISTS "job_offers" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
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
      client.query("DROP TABLE users CASCADE"),
      client.query("DROP TABLE sessions CASCADE"),
      client.query("DROP TABLE posts CASCADE"),
      client.query("DROP TABLE comments CASCADE"),
      client.query("DROP TABLE companies CASCADE"),
      client.query("DROP TABLE job_offers CASCADE"),
    ];
    await Promise.all(promises);
    console.log("Tables droped");
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
