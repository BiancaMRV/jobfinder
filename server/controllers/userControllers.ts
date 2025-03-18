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
    return result.rows[0]; // Make sure to return the user data if found
  } catch (error) {
    console.error("User doesn't exist", error);
    throw new Error("User doesn't exist");
  }
};

type UserType = "jobSeeker" | "company";

export const createNewUser = async (
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  currentJob: string,
  location: string,
  isWorking: boolean,
  role: UserType
) => {
  try {
    const result = await client.query(
      `INSERT INTO users(
        firstName, 
        lastName, 
        password, 
        email, 
        currentJob, 
        location,
        isWorking, 
        role
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        firstName,
        lastName,
        password,
        email,
        currentJob,
        location,
        isWorking,
        role,
      ]
    );
    console.log("User created successfully");
    return result.rows[0];
  } catch (error) {
    console.error("User not created", error);
    throw new Error("User not created");
  }
};

export const updateUser = async (
  userId: number,
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  currentJob: string,
  location: string,
  isWorking: boolean,
  role: UserType
) => {
  try {
    const result = await client.query(
      `UPDATE users SET 
        firstName=$1,
        lastName=$2, 
        password=$3, 
        email=$4, 
        currentJob=$5, 
        location=$6,
        isWorking=$7,
        role=$8
      WHERE id=$9 RETURNING *`,
      [
        firstName,
        lastName,
        password,
        email,
        currentJob,
        location,
        isWorking,
        role,
        userId,
      ]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found, can't update");
    }
    console.log("User updated successfully");
    return result.rows[0];
  } catch (error) {
    console.error("User not updated", error);
    throw new Error("User not updated");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const result = await client.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found, can't delete");
    }
    console.log("User deleted");
    return result.rows[0];
  } catch (error) {
    console.error("Can't delete user", error);
    throw new Error("Can't delete user");
  }
};
