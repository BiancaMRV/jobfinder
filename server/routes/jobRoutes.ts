import express from "express";
import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
} from "../controllers/jobControllers";
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
} from "../middleware/validationMiddleware";

export const router = express.Router();

router.get(
  "/jobs/:jobOfferId",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const job = await getJobOfferById(jobOfferId);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error retrieving job");
    }
  }
);

router.post(
  "/jobs",
  validateRequest(createUserValidation),
  async (req, res) => {
    try {
      const { title, description, companyId } = req.body;
      const job = await createNewJobOffer(title, description, companyId);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error creating job");
    }
  }
);

router.delete(
  "/jobs/:jobOfferId",
  validateRequest(deleteUserValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const job = await deleteJobOffer(jobOfferId);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error deleting job");
    }
  }
);

router.patch(
  "/jobs/:jobOfferId",
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { title, description } = req.body;
      const job = await updateJobOffer(jobOfferId, title, description);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error updating job");
    }
  }
);
