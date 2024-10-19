import express from "express";
import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
} from "../controllers/jobControllers";

const routers = express.Router();

routers.get("/jobs", async (req, res) => {
  try {
    const jobs = await getAllJobOffers();
    res.send(jobs);
  } catch (error) {
    res.status(500).send("Error retrieving jobs");
  }
});

routers.get("/jobs/:jobOfferId", async (req, res) => {
  try {
    const { jobOfferId } = req.params;
    const job = await getJobOfferById(jobOfferId);
    res.send(job);
  } catch (error) {
    res.status(500).send("Error retrieving job");
  }
});

routers.post("/jobs", async (req, res) => {
  try {
    const { title, description, companyId } = req.body;
    const job = await createNewJobOffer(title, description, companyId);
    res.send(job);
  } catch (error) {
    res.status(500).send("Error creating job");
  }
});

routers.delete("/jobs/:jobOfferId", async (req, res) => {
  try {
    const { jobOfferId } = req.params;
    const job = await deleteJobOffer(jobOfferId);
    res.send(job);
  } catch (error) {
    res.status(500).send("Error deleting job");
  }
});

routers.patch("/jobs/:jobOfferId", async (req, res) => {
  try {
    const { jobOfferId } = req.params;
    const { title, description } = req.body;
    const job = await updateJobOffer(jobOfferId, title, description);
    res.send(job);
  } catch (error) {
    res.status(500).send("Error updating job");
  }
});
