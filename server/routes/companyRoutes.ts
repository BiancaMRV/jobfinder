import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  createNewCompany,
  deleteCompany,
  updateCompany,
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
