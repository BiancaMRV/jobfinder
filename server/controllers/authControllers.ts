import client from "../config/database";

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      throw new Error("Email already exists");
      return undefined;
    }
    // TODO: ENCRIPTAR A PASSWORD
    const result = await client.query(
      "INSERT INTO users(email,passwors,name) VALUES ($1,$2,$3)",
      [name, email, password]
    );
    return result;
  } catch (error) {
    console.log("user not created");
    throw new Error("user not created");
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    } // TODO: QUANDO O USER METE A PASSWORD ERRADA
    return result;
  } catch (error) {
    console.error("user doesnt exist", error);
    throw new Error("user doesnt exist");
  }
};
