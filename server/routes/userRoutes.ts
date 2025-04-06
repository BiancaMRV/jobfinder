import { Router } from "express";
import {
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
  createUserValidation,
} from "../middleware/validationMiddleware.js";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers.js";
import authenticationMiddleWare from "../middleware/authMiddleware.js";

export const router = Router();
type UserType = "jobSeeker" | "company";
router.get("/", authenticationMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;

    console.log("userId", userId);
    const user = await getUserById(String(userId));
    res.send(user);
    console.log("user", user);
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
});
router.get(
  "/:userId?",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      let { userId } = req.params;
      if (!userId) {
        userId = String(req.userId);
      }
      console.log("userId", userId);
      const user = await getUserById(userId);
      res.send(user);
      console.log("user", user);
    } catch (error) {
      res.status(500).send("Error retrieving user");
    }
  }
);

router.delete(
  "/:userId",
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

router.patch(
  "/:userId",
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const {
        first_name,
        last_name,
        email,
        password,
        age,
        isWorking,
        currentJob,
        userType,
      } = req.body;
      const user = await updateUser(
        first_name,
        last_name,
        password,
        age,
        email,
        userId,
        currentJob,
        isWorking,
        userType
      );
      res.send(user);
    } catch (error) {
      res.status(500).send("Error updating user");
    }
  }
);
