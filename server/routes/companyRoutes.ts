import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  getAllCompaniesByUserId,
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
import authenticationMiddleWare from "../middleware/authMiddleware";

export const router = express.Router();

// Rota para obter a empresa do usuário logado
// Agora é "/" em vez de "/companies" porque o prefixo já foi adicionado em app.js
router.get("/", authenticationMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Getting user ID:", userId);

    const companies = await getAllCompaniesByUserId(String(userId));
    console.log("Results:", companies.rows);

    // Return the first company or an empty object if none exists
    if (companies.rows && companies.rows.length > 0) {
      res.json(companies.rows[0]);
    } else {
      res.status(404).json({ message: "No company found for this user" });
    }
  } catch (error) {
    console.error("Error in /companies route:", error);
    res.status(500).json({ message: "Error retrieving companies" });
  }
});

// Rota para buscar empresa por ID
router.get("/:companyId", validateRequest(getCompanyById), async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companies = await getAllCompaniesById(companyId);

    if (companies.rows && companies.rows.length > 0) {
      res.json(companies.rows[0]);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error("Error retrieving company by ID:", error);
    res.status(500).json({ message: "Error retrieving company" });
  }
});

// Rota para criar uma nova empresa
router.post(
  "/",
  authenticationMiddleWare,
  validateRequest(createCompanyValidation),
  async (req, res) => {
    try {
      const { name, location, email } = req.body;
      const userId = req.userId; // Assuming this is set by your auth middleware

      console.log("Criando empresa:", { name, location, email, userId });

      const company = await createNewCompany(
        name,
        location,
        email,
        String(userId)
      );

      console.log("Empresa criada com sucesso:", company.rows[0]);
      res.status(201).json(company.rows[0]);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({ message: "Error creating company" });
    }
  }
);

// Rota para busca de empresas
router.get(
  "/search/:query",
  validateRequest(searchCompanyValidation),
  async (req, res) => {
    try {
      const { query } = req.params;
      const companies = await searchCompany(query);

      if (companies.rows && companies.rows.length > 0) {
        res.json(companies.rows);
      } else {
        res
          .status(404)
          .json({ message: "No companies found matching the search criteria" });
      }
    } catch (error) {
      console.error("Error searching companies:", error);
      res.status(500).json({ message: "Error retrieving companies" });
    }
  }
);

// Rota para excluir empresa
router.delete(
  "/",
  authenticationMiddleWare,
  validateRequest(deleteCompanyValidation),
  async (req, res) => {
    try {
      const { companyId } = req.body;
      const company = await deleteCompany(companyId);
      res.json({ message: "Company deleted successfully" });
    } catch (error) {
      console.error("Error deleting company:", error);
      res.status(500).json({ message: "Error deleting company" });
    }
  }
);

// Rota para atualizar empresa
router.patch(
  "/",
  authenticationMiddleWare,
  validateRequest(updateCompanyValidation),
  async (req, res) => {
    try {
      const { companyId, name, location, email } = req.body;
      const company = await updateCompany(companyId, name, location, email);
      res.json({ message: "Company updated successfully" });
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ message: "Error updating company" });
    }
  }
);

// Rota para obter ofertas de emprego de uma empresa
router.get(
  "/:companyId/jobOffers",
  validateRequest(getCompanyAllJobOffers),
  async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const jobOffers = await getAllJobOffersFromCompany(companyId);

      if (jobOffers.rows) {
        res.json(jobOffers.rows);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error retrieving job offers:", error);
      res.status(500).json({ message: "Error retrieving job offers" });
    }
  }
);

export default router;
