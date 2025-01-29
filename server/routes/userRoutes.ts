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

export const router = Router();

router.get("/:userId", validateRequest(getUserValidation), async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(Number(userId));
    res.send(user);
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
});

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
      } = req.body;
      const user = await updateUser(
        first_name,
        last_name,
        password,
        age,
        email,
        Number(userId),
        currentJob,
        isWorking
      );
      res.send(user);
    } catch (error) {
      res.status(500).send("Error updating user");
    }
  }
);
