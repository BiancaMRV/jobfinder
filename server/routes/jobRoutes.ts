import express from "express";
import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
} from "../controllers/jobControllers";
import {
  validateRequest,
  getJobOfferByIdValidation,
  createNewJobOfferValidation,
  deleteJobOfferValidation,
  updateJobOfferValidation,
} from "../middleware/validationMiddleware";

export const router = express.Router();

router.get(
  "/jobs/:jobOfferId",
  validateRequest(getJobOfferByIdValidation),
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
  validateRequest(createNewJobOfferValidation),
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
  validateRequest(deleteJobOfferValidation),
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
  validateRequest(updateJobOfferValidation),
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
