import express from "express";

import {
  getAllApplication,
  createNewApplication,
  getApplicationById,
  deleteApplication,
  updateApplicationResume,
  updateApplicationStatus,
} from "../controllers/applicationControllers";
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
} from "../middleware/validationMiddleware";

const routers = express.Router();

routers.get(
  "/application",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const application = getAllApplication();
      res.send(application);
    } catch (error) {
      res.status(500).send("Error retrieving applications");
    }
  }
);

routers.get(
  "/application/:applicationId",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const { applicationId } = req.params; // Extract applicationId from the request body
      const application = await getApplicationById(applicationId); // Pass applicationId as an argument
      res.send(application);
    } catch (error) {
      res.status(500).send("Error retrieving application by ID");
    }
  }
);

routers.delete(
  "/application",
  validateRequest(deleteUserValidation),
  async (req, res) => {
    try {
      const { applicationId } = req.body;
      const application = await deleteApplication(applicationId);
      res.send(application);
    } catch (error) {
      res.status(500).send("Error deleting application");
    }
  }
);

routers.post(
  "/application",
  validateRequest(createUserValidation),
  async (req, res) => {
    try {
      const { name, cover_letter, resume, job_offer_id, company_id } = req.body;
      const application = await createNewApplication(
        name,
        cover_letter,
        resume,
        job_offer_id,
        company_id
      );
      res.send(application);
    } catch (error) {
      res.status(500).send("Error creating application");
    }
  }
);

routers.patch(
  "/application/cover_letter",
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { cover_letter, applicationId, userId } = req.body;
      const application = await updateApplicationResume(
        cover_letter,
        applicationId,
        userId
      );
      res.send(application);
    } catch (error) {
      res.status(500).send("Error updating application");
    }
  }
);

routers.patch(
  "/application/status",
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { status, applicationId, userId } = req.body;
      const application = await updateApplicationStatus(
        status,
        applicationId,
        userId
      );
      res.send(application);
    } catch (error) {
      res.status(500).send("Error updating application");
    }
  }
);
