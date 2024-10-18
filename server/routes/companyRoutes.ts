import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  createNewCompany,
  deleteCompany,
  updateCompany,
  getAllJobOffersFromCompany,
} from "../controllers/companiesControllers";

const routers = express.Router();

routers.get("/companies", async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.send(companies);
  } catch (error) {
    res.status(500).send("Error retrieving companies");
  }
});

routers.get("/companies/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companies = await getAllCompaniesById(companyId);
    res.send(companies);
  } catch (error) {
    res.status(500).send("Error retrieving companies");
  }
});

routers.post("/companies", async (req, res) => {
  try {
    const { name, description } = req.body; // Assuming the function requires 'name' and 'otherArg'
    const company = await createNewCompany(name, description);
    res.send(company);
  } catch (error) {
    res.status(500).send("Error creating company");
  }
});

routers.delete("/companies", async (req, resp) => {
  try {
    const { companyId } = req.body;
    const company = await deleteCompany(companyId);
    resp.send(company);
  } catch (error) {
    resp.status(500).send("Error deleting company");
  }
});

routers.patch("/companies", async (req, resp) => {
  try {
    const { companyId, description } = req.body;
    const company = await updateCompany(companyId, description);
    resp.send(company);
  } catch (error) {
    resp.status(500).send("Error updating company");
  }
});

routers.get("/companies/:companyId/jobOffers", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobOffers = await getAllJobOffersFromCompany(companyId);
    res.send(jobOffers);
  } catch (error) {
    res.status(500).send("Error retrieving job offers");
  }
});

//get, post, patch, put, delete
//patch é analogo com update
//put = atualiza uma cena inteira, patch = atualiza parte
