import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers";

const routers = Router();

routers.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});

routers.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(Number(userId));
    res.send(user);
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
});

routers.post("/users", async (req, res) => {
  try {
    const { name, password, age, email, currentJob, isWorking } = req.body;
    const user = await createNewUser(
      name,
      password,
      age,
      email,
      currentJob,
      isWorking
    );
    res.send(user);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

routers.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await deleteUser(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

routers.patch("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, age } = req.body;
    const user = await updateUser(userId, name, email, password, age);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
});
