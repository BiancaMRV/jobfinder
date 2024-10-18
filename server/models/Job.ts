import express from "express";

import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
} from "../controllers/jobControllers";

const routers = express.Router();

routers.get("/jobOffers", async (req, res) => {
  try {
    const jobOffers = await getAllJobOffers();
    res.send(jobOffers);
  } catch (error) {
    res.status(500).send("Error retrieving job offers");
  }
});

routers.get("/jobOffers/:jobOfferId", async (req, res) => {
  try {
    const { jobOfferId } = req.params; // nao é body porque é um parametro da url
    const jobOffer = await getJobOfferById(jobOfferId);
    res.send(jobOffer);
  } catch (error) {
    res.status(500).send("Error retrieving job offer");
  }
});

routers.post("/jobOffers", async (req, res) => {
  try {
    const { title, description, company_id } = req.body; // envia se no body
    const jobOffer = await createNewJobOffer(title, description, company_id);
    res.send(jobOffer);
  } catch (error) {
    res.status(500).send("Error creating job offer");
  }
});
routers.delete("/jobOffers", async (req, res) => {
  try {
    const { jobOfferId } = req.body;
    const jobOffer = await deleteJobOffer(jobOfferId);
    res.send(jobOffer);
  } catch (error) {
    res.status(500).send("Error deleting job offer");
  }
});

routers.patch("/jobOffers", async (req, res) => {
  try {
    const { jobOfferId, title, description } = req.body;
    const jobOffer = await updateJobOffer(jobOfferId, title, description);
    res.send(jobOffer);
  } catch (error) {
    res.status(500).send("Error updating job offer");
  }
});
