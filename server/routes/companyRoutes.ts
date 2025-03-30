import express from "express";
import {
  getAllCompaniesById,
  getAllCompanies,
  getCompanyByUserId,
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
import { getUserById } from "../controllers/userControllers";
import authenticationMiddleWare from "../middleware/authMiddleware";

export const router = express.Router();

router.get("/", authenticationMiddleWare, async (req: any, res: any) => {
  try {
    const userId = req.userId;
    console.log("Getting user ID:", userId);

    const company = await getCompanyByUserId(String(userId));
    console.log("Results:", company);
    if (company == undefined) {
      console.log(
        "Nenhuma empresa encontrada para o usuário. Criando nova empresa..."
      );

      const user = await getUserById(String(userId));

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const name = user.name || `${user.firstname} ${user.lastname}`;
      const location = user.location || "";
      const email = user.email || "";
      const description = "";

      console.log(`A criar empresa para usuário: ${name}, ${email}`);

      const newCompany = await createNewCompany(
        name,
        location,
        email,
        description,
        userId
      );

      console.log("Nova empresa criada:", newCompany.rows[0]);
      return res.json(newCompany.rows[0]);
    }
  } catch (error) {
    console.error("Error in /companies route:", error);
    res.status(500).json({ message: "Error retrieving companies" });
  }
});

router.get("/:companyId", validateRequest(getCompanyById), async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companies = await getAllCompaniesById(Number(companyId));

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

// router.post(
//   "/",
//   authenticationMiddleWare,
//   validateRequest(createCompanyValidation),
//   async (req, res, next) => {
//     try {
//       const { name, location, email, description } = req.body;
//       const userId = req.userId;

//       console.log("Creating company:", {
//         name,
//         location,
//         email,
//         description,
//         userId,
//       });

//       if (!name) {
//         res.status(400).json({ message: "Company name is required" });
//         return;
//       }

//       const company = await createNewCompany(
//         name,
//         location || "",
//         email || "",
//         description || "",
//         String(userId)
//       );

//       console.log("Empresa criada com sucesso:", company.rows[0]);
//       res.status(201).json(company.rows[0]);
//     } catch (error) {
//       console.error("Error creating company:", error);
//       res.status(500).json({
//         message: "Error creating company",
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//   }
// );
// Em /routes/companiesRoutes.js (ou paste.txt no seu caso)

// Descomentar a rota POST para /companies
router.post(
  "/",
  authenticationMiddleWare,
  validateRequest(createCompanyValidation),
  async (req, res, next) => {
    try {
      const { name, location, email, description } = req.body;
      const userId = req.userId;

      console.log("Creating company:", {
        name,
        location,
        email,
        description,
        userId,
      });

      if (!name) {
        res.status(400).json({ message: "Company name is required" });
        return;
      }

      const company = await createNewCompany(
        name,
        location || "",
        email || "",
        description || "",
        String(userId)
      );

      console.log("Empresa criada com sucesso:", company.rows[0]);
      res.status(201).json(company.rows[0]);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({
        message: "Error creating company",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
);

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

router.get(
  "/:companyId/jobOffers",
  validateRequest(getCompanyAllJobOffers),
  async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const jobOffers = await getAllJobOffersFromCompany(Number(companyId));

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
