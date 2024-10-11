import client from "../config/database";

export const getAllUsers = async () => {
  try {
    const result = await client.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error("Error retrieving users", error);
    throw new Error("Error retrieving users");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length === 0) return undefined;
  } catch (error) {
    console.error("user doesnt exist", error);
    throw new Error("user doesnt exist");
  }
};

export const createNewUser = async (
  name: string,
  password: string,
  age: string,
  email: string,
  currentJob: string,
  isWorking: string
) => {
  try {
    const result = await client.query(
      "INSERT INTO users(name, password, age, email, currentJob, isWorking) VALUES($1, $2, $3, $4, $5, $6)",
      [name, password, age, email, currentJob, isWorking]
    );
    console.log("User created successfully");
    return result;
  } catch (error) {
    console.error("user not created");
    throw new Error("user not created");
  }
};

export const updateUser = async (
  name: string,
  password: string,
  age: string,
  email: string,
  userId: string
) => {
  try {
    const result = await client.query(
      "UPDATE users SET name=$1, password=$2, age=$3, email=$4 WHERE id=$5",
      [name, password, age, email, userId]
    );
    if (result.rows.length === 0) {
      throw new Error("user not found can't update");
    }
    console.log("User updated with sucess");
    return result;
  } catch (error) {
    console.error("user not updated", error);
    throw new Error("user not updated"); // throw é tipo um stop no codigo, ele avisa os outros catches das rotas que ha um erro
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const result = await client.query("DELETE FROM users WHERE userId=$1", [
      userId,
    ]);
    console.log("User deleted");
    return result;
  } catch (error) {
    console.error("can't delete user", error);
    throw new Error("can't delete user");
  }
};
