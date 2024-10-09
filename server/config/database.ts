import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pg;

const client = new Client({
  user: "postgres", // propriedade: value
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

try {
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}
export default client;
