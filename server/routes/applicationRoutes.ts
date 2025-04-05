import express from "express";

import {
  getAllApplication,
  createNewApplication,
  getApplicationById,
  deleteApplication,
  updateApplicationResume,
  updateApplicationStatus,
  updateApplicationStatus1,
  getApplicationStats,
  getCandidatesfromApplication,
} from "../controllers/applicationControllers";
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
} from "../middleware/validationMiddleware";
import authenticationMiddleWare from "../middleware/authMiddleware";

export const router = express.Router();
router.get(
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

router.get(
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

router.delete(
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

router.post("/application", authenticationMiddleWare, async (req, res) => {
  try {
    const { cover_letter, resume, job_offer_id, company_id } = req.body;
    const application = await createNewApplication(
      req.userId,
      cover_letter,
      resume,
      job_offer_id,
      company_id
    );
    res.send(application);
  } catch (error) {
    res.status(500).send("Error creating application");
  }
});

router.get("/application/:applicationId/candidates", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await getCandidatesfromApplication(applicationId);
    res.send(application);
  } catch (error) {
    res.status(500).send("Error retrieving candidates from application");
  }
});

router.patch(
  "/application/cover_letter",
  authenticationMiddleWare,
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { cover_letter, applicationId } = req.body;
      const application = await updateApplicationResume(
        cover_letter,
        applicationId,
        req.userId
      );
      res.send(application);
    } catch (error) {
      res.status(500).send("Error updating application");
    }
  }
);

router.patch(
  "/:id/status",
  authenticationMiddleWare,
  validateRequest(updateUserValidation),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const application = await updateApplicationStatus(status, id, req.userId);
      res.send(application);
    } catch (error) {
      res.status(500).send("Error updating application");
    }
  }
);

router.get("/stats", authenticationMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const stats = await getApplicationStats(userId);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching application stats:", error);
    res.status(500).send("Error fetching application statistics");
  }
});
