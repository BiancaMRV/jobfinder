import client from "./database";
import seedDatabase from "./seed";

const createUsers = `CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  currentJob VARCHAR(255),
  location VARCHAR(255),
  isWorking BOOLEAN DEFAULT false,
  role VARCHAR(20) NOT NULL DEFAULT 'jobSeeker',
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
    user_id INTEGER REFERENCES users(id) UNIQUE NOT NULL, 
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR (255),
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
//user_id INTEGER REFERENCES users(id): Cria uma chave estrangeira que referencia a tabela users, unique garante que um usuario so pode ter uma empresa not null garante que toda empresa deve estar associada a um usuario
const createJobOffers = `CREATE TABLE IF NOT EXISTS "job_offers" (
  id SERIAL PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,
  logo TEXT,
  experienceLevelId VARCHAR(50), 
  jobTypeId VARCHAR(50),
  salary NUMERIC(10, 2),
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  applicants_count INTEGER DEFAULT 0,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createJobApplication = `CREATE TABLE IF NOT EXISTS "application" (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL REFERENCES users(id),
  job_offer_id INTEGER NOT NULL REFERENCES job_offers(id), 
  cover_letter TEXT NOT NULL, 
  resume TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  company_id INTEGER NOT NULL REFERENCES companies(id),
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
    console.log("Tables created");
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

await dropTables();
await createTables();
await seedDatabase();
client.end();
process.exit(0);
