import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  createNewCompany,
  deleteCompany,
  updateCompany,
  getAllJobOffersFromCompany,
} from "../controllers/companiesControllers";
import {
  createUserValidation,
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  validateRequest,
} from "../middleware/validationMiddleware";

const routers = express.Router();

routers.get(
  "/companies/:companyId",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const companies = await getAllCompaniesById(companyId);
      res.send(companies);
    } catch (error) {
      res.status(500).send("Error retrieving companies");
    }
  }
);

routers.post(
  "/companies",
  validateRequest(createUserValidation),
  async (req, res) => {
    try {
      const { name, description } = req.body; // Assuming the function requires 'name' and 'otherArg'
      const company = await createNewCompany(name, description);
      res.send(company);
    } catch (error) {
      res.status(500).send("Error creating company");
    }
  }
);
// TODO:IMPLMENTAR SEARCHCOMPANY POR NOME

routers.delete(
  "/companies",
  validateRequest(deleteUserValidation),
  async (req, resp) => {
    try {
      const { companyId } = req.body;
      const company = await deleteCompany(companyId);
      resp.send(company);
    } catch (error) {
      resp.status(500).send("Error deleting company");
    }
  }
);

routers.patch(
  "/companies",
  validateRequest(updateUserValidation),
  async (req, resp) => {
    try {
      const { companyId, description } = req.body;
      const company = await updateCompany(companyId, description);
      resp.send(company);
    } catch (error) {
      resp.status(500).send("Error updating company");
    }
  }
);

routers.get(
  "/companies/:companyId/jobOffers",
  validateRequest(getUserValidation),
  async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const jobOffers = await getAllJobOffersFromCompany(companyId);
      res.send(jobOffers);
    } catch (error) {
      res.status(500).send("Error retrieving job offers");
    }
  }
);

//get, post, patch, put, delete
//patch é analogo com update
//put = atualiza uma cena inteira, patch = atualiza parte
