import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  createNewCompany,
  deleteCompany,
  updateCompany,
  getAllJobOffersFromCompany,
  searchCompany,
} from "../controllers/companiesControllers";
import {
  createCompanyValidation,
  deleteCompanyValidation,
  getCompanyAllJobOffers,
  getCompanyById,
  searchCompanyValidation,
  updateCompanyValidation,
  validateRequest,
} from "../middleware/validationMiddleware";

export const router = express.Router();

router.get(
  "/companies/:companyId",
  validateRequest(getCompanyById),
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

router.post(
  "/companies",
  validateRequest(createCompanyValidation),
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
router.get(
  "/companies/search/:query",
  validateRequest(searchCompanyValidation),
  async (req, res) => {
    try {
      const { query } = req.params;
      const companies = await searchCompany(query);
      res.send(companies);
    } catch (error) {
      res.status(500).send("Error retrieving companies");
    }
  }
);

router.delete(
  "/companies",
  validateRequest(deleteCompanyValidation),
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

router.patch(
  "/companies",
  validateRequest(updateCompanyValidation),
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

router.get(
  "/companies/:companyId/jobOffers",
  validateRequest(getCompanyAllJobOffers),
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
