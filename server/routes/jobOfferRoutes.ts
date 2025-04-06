import express from "express";
import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
  getJobOffersBySalaryRange,
  getJobOffersByJobType,
  getJobOfferByExperienceLevel,
  getJobOffersByLocation,
  getJobOffersByCompany,
  getJobOfferCandidates,
} from "../controllers/jobOfferControllers.js";
import authenticationMiddleWare from "../middleware/authMiddleware.js";
import client from "../config/database";
import { getCompanyByUserId } from "../controllers/companiesControllers.js";

export const router = express.Router();

type AnyReq = any;
type AnyRes = any;

router.get("/", async function (req: AnyReq, res: AnyRes) {
  try {
    const result = await getAllJobOffers();
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching job offers:", error);
    res.status(500).json({ error: "Erro ao buscar vagas de emprego" });
  }
});

// Rota para filtrar ofertas de emprego
router.get("/filter", async function (req: AnyReq, res: AnyRes) {
  try {
    const { jobTypes, experienceLevels, minSalary, maxSalary } = req.query;
    console.log("Filter params:", {
      jobTypes,
      experienceLevels,
      minSalary,
      maxSalary,
    });

    // Construir a consulta SQL base
    let query = `
      SELECT 
        job_offers.id,
        job_offers.title,
        job_offers.description,
        job_offers.location,
        job_offers.salary,
        job_offers.experienceLevelId,
        job_offers.jobTypeId,
        job_offers.created_at,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM job_offers
      LEFT JOIN companies ON job_offers.company_id = companies.id
      WHERE 1=1
    `;

    const params = [];
    let paramCounter = 1;

    if (jobTypes) {
      query += ` AND job_offers.jobTypeId LIKE $${paramCounter++}`;
      params.push(`%${jobTypes}%`);
    }

    if (experienceLevels) {
      query += ` AND job_offers.experienceLevelId LIKE $${paramCounter++}`;
      params.push(`%${experienceLevels}%`);
    }

    if (minSalary && !isNaN(Number(minSalary))) {
      query += ` AND job_offers.salary >= $${paramCounter++}`;
      params.push(Number(minSalary));
    }

    if (maxSalary && !isNaN(Number(maxSalary))) {
      query += ` AND job_offers.salary <= $${paramCounter++}`;
      params.push(Number(maxSalary));
    }

    console.log("Executing query:", query);
    console.log("With params:", params);

    const result = await client.query(query, params);
    console.log(`Found ${result.rows?.length || 0} job offers`);

    res.json(result.rows || []);
  } catch (error) {
    console.error("Error filtering jobs:", error);
    res.status(500).json({ error: "Erro ao filtrar vagas de emprego" });
  }
});

router.get("/salary-range", async function (req: AnyReq, res: AnyRes) {
  try {
    const minSalary = Number(req.query.minSalary || "0");
    const maxSalary = Number(req.query.maxSalary || "1000000");

    const result = await getJobOffersBySalaryRange(minSalary, maxSalary);
    res.json(result);
  } catch (error) {
    console.error("Error fetching jobs by salary range:", error);
    res.status(500).json({ error: "Erro ao buscar vagas por faixa salarial" });
  }
});

router.get("/job-type/:type", async function (req: AnyReq, res: AnyRes) {
  try {
    const { type } = req.params;
    const result = await getJobOffersByJobType(type);
    res.json(result);
  } catch (error) {
    console.error("Error fetching jobs by job type:", error);
    res.status(500).json({ error: "Erro ao buscar vagas por tipo" });
  }
});

router.get(
  "/experience-level/:level",
  async function (req: AnyReq, res: AnyRes) {
    try {
      const { level } = req.params;
      const result = await getJobOfferByExperienceLevel(level);
      res.json(result);
    } catch (error) {
      console.error("Error fetching jobs by experience level:", error);
      res
        .status(500)
        .json({ error: "Erro ao buscar vagas por nível de experiência" });
    }
  }
);

router.get("/location/:location", async function (req: AnyReq, res: AnyRes) {
  try {
    const { location } = req.params;
    const result = await getJobOffersByLocation(location);
    res.json(result);
  } catch (error) {
    console.error("Error fetching jobs by location:", error);
    res.status(500).json({ error: "Erro ao buscar vagas por localização" });
  }
});

router.get(
  "/company",
  authenticationMiddleWare,
  async function (req: AnyReq, res: AnyRes) {
    try {
      const company = await getCompanyByUserId(req.userId);
      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }
      const companyId = company.id;
      const jobOffers = await getJobOffersByCompany(Number(companyId));
      res.json(jobOffers);
    } catch (error) {
      console.error("Error retrieving job offers:", error);
      res.status(500).json({ message: "Error retrieving joboffers" });
    }
  }
);

router.get("/:id", async function (req: AnyReq, res: AnyRes) {
  try {
    const { id } = req.params;
    console.log(`Buscando job com ID: ${id}`);

    const job = await getJobOfferById(id);

    if (!job) {
      console.log(`Job com ID ${id} não encontrado`);
      return res.status(404).json({ error: "Vaga não encontrada" });
    }

    console.log(`Job encontrado: ${job.title}`);
    res.json(job);
  } catch (error) {
    console.error(`Erro ao buscar job com ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Erro ao buscar vaga de emprego" });
  }
});

router.post(
  "/",
  authenticationMiddleWare,
  async function (req: AnyReq, res: AnyRes) {
    try {
      const {
        title,
        description,
        logo,

        experienceLevelId,
        location,
        jobTypeId,
        salary,
      } = req.body;

      if (!title || !description || !experienceLevelId || !jobTypeId) {
        return res.status(400).json({ error: "Campos obrigatórios a faltar" });
      }
      const userId = req.userId;
      const company = await getCompanyByUserId(userId);
      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }
      const companyId = company.id;

      console.log("Company ID from database:", companyId);

      const newJob = await createNewJobOffer(
        title,
        description,
        logo || "",
        companyId,
        experienceLevelId,
        location || "",
        jobTypeId,
        salary || 0
      );

      res.status(201).json(newJob);
    } catch (error) {
      console.error("Error creating job offer:", error);
      res.status(500).json({ error: "Erro ao criar vaga de emprego" });
    }
  }
);

router.put(
  "/:id",
  authenticationMiddleWare,
  async function (req: AnyReq, res: AnyRes) {
    try {
      const { id } = req.params;
      const { title, description, location } = req.body;

      if (!title && !description && !location) {
        return res.status(400).json({ error: "Nenhum campo para atualizar" });
      }

      const updatedJob = await updateJobOffer(
        id,
        title || "",
        description || "",
        location || ""
      );

      res.json(updatedJob);
    } catch (error) {
      console.error("Error updating job offer:", error);
      res.status(500).json({ error: "Erro ao atualizar vaga de emprego" });
    }
  }
);

router.delete(
  "/:id",
  authenticationMiddleWare,
  async function (req: AnyReq, res: AnyRes) {
    try {
      const { id } = req.params;
      await deleteJobOffer(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting job offer:", error);
      res.status(500).json({ error: "Erro ao excluir vaga de emprego" });
    }
  }
);

router.get(
  "/:id/candidates",
  authenticationMiddleWare,
  async function (req: AnyReq, res: AnyRes) {
    try {
      const { id } = req.params;
      const jobOfferCandidates = await getJobOfferCandidates(id);
      res.json(jobOfferCandidates);
    } catch (error) {
      console.error("Error fetching job offers by company:", error);
      res.status(500).json({ error: "Erro ao buscar vagas por empresa" });
    }
  }
);

export default router;
