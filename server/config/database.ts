import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

// Use a variável de ambiente ou a string de conexão direta do Neon
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões SSL do Neon
  },
});

try {
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}

export default client;
