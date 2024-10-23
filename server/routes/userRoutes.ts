import { Router } from "express";
import {
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
  createUserValidation,
} from "../middleware/validationMiddleware";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers";

const routers = Router();

routers.get(
  "/users/:userId",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await getUserById(Number(userId));
      res.send(user);
    } catch (error) {
      res.status(500).send("Error retrieving user");
    }
  }
);

routers.delete(
  "/users/:userId",
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await deleteUser(userId);
      res.send(user);
    } catch (error) {
      res.status(500).send("Error deleting user");
    }
  }
);

routers.patch(
  "/users/:userId",
  validateRequest(deleteUserValidation),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email, password, age } = req.body;
      const user = await updateUser(userId, name, email, password, age);
      res.send(user);
    } catch (error) {
      res.status(500).send("Error updating user");
    }
  }
);
