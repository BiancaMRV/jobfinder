import express from "express";
import {
  getAllJobOffers,
  getJobOfferById,
  createNewJobOffer,
  deleteJobOffer,
  updateJobOffer,
  getJobOfferByExperienceLevel,
  getJobOffersByJobType,
  getJobOffersBySalaryRange,
} from "../controllers/jobOfferControllers";
import { Client } from "pg";

const client = new Client({
  user: "yourUsername",
  host: "yourHost",
  database: "yourDatabase",
  password: "yourPassword",
  port: 5432,
});

client.connect();
import {
  validateRequest,
  getJobOfferByIdValidation,
  createNewJobOfferValidation,
  deleteJobOfferValidation,
  updateJobOfferValidation,
  getJobOfferByExperienceLevelValidation,
  getJobOfferBySalaryRangeValidation,
  getJobOfferByJobTypeValidation,
  getJobOffers,
} from "../middleware/validationMiddleware";

export const router = express.Router();

router.get(
  "/jobs/:jobOfferId",
  validateRequest(getJobOfferByIdValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const job = await getJobOfferById(jobOfferId);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error retrieving job");
    }
  }
);

router.post(
  "/jobs",
  validateRequest(createNewJobOfferValidation),
  async (req, res) => {
    try {
      //req.query.salary
      const {
        title,
        description,
        companyId,
        experienceLevelId,
        jobTypeId,
        salaryRangeId,
      } = req.body;
      const job = await createNewJobOffer(
        title,
        description,
        companyId,
        experienceLevelId,
        jobTypeId,
        salaryRangeId
      );
      res.send(job);
    } catch (error) {
      res.status(500).send("Error creating job");
    }
  }
);

router.delete(
  "/jobs/:jobOfferId",
  validateRequest(deleteJobOfferValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const job = await deleteJobOffer(jobOfferId);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error deleting job");
    }
  }
);

router.patch(
  "/jobs/:jobOfferId",
  validateRequest(updateJobOfferValidation),
  async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { title, description } = req.body;
      const job = await updateJobOffer(jobOfferId, title, description);
      res.send(job);
    } catch (error) {
      res.status(500).send("Error updating job");
    }
  }
);

router.get(
  "/jobs/filter/minsalary/maxsalary",
  validateRequest(getJobOfferBySalaryRangeValidation),
  async (req, res) => {
    try {
      const { minSalary, maxSalary } = req.query;
      const jobs = await getJobOffersBySalaryRange(
        Number(minSalary),
        Number(maxSalary)
      );
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).send("Error retrieving jobs by salary range");
    }
  }
);

router.get(
  "/jobs/filter/fulltime/partime/internship/voluntering",
  validateRequest(getJobOfferByJobTypeValidation),
  async (req, res) => {
    try {
      const { fulltime, partime, internship, voluntering } = req.query;
      const jobs = await getJobOffersByJobType(
        fulltime as string,
        partime as string,
        internship as string,
        voluntering as string
      );
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).send("Error retrieving jobs by type");
    }
  }
);

router.get(
  "/jobs/filter/entry/intermediate/senior",
  validateRequest(getJobOfferByExperienceLevelValidation),
  async (req, res) => {
    try {
      const { entry, intermediate, senior } = req.query;
      const jobs = await getJobOfferByExperienceLevel(
        entry as string,
        intermediate as string,
        senior as string
      );
      res.status(200).json(jobs); // codigo padrao pra ok
    } catch (error) {
      res.status(500).send("Error retrieving jobs by experience level"); // codigo padrao pra erro
    }
  }
);

router.get("/jobs/filter", validateRequest(getJobOffers), async (req, res) => {
  try {
    const { minSalary, maxSalary, jobType, experienceLevel } = req.query;

    let query = `
        SELECT 
          jobOffers.id,
          jobOffers.title,
          jobOffers.description,
          jobOffers.salary,
          jobOffers.experience_level,
          jobOffers.job_type,
          jobOffers.applicants_count,
          jobOffers.posted_date,
          companies.name AS company_name,
          companies.logo_url AS company_logo
        FROM jobOffers
        JOIN companies ON jobOffers.company_id = companies.id
        WHERE 1=1
      `;
    const values: any[] = [];

    if (minSalary && maxSalary) {
      query += `AND jobOffers.salary BETWEEN $${values.length + 1} AND $${
        values.length + 2
      }`;
      values.push(Number(minSalary), Number(maxSalary));
    }

    if (jobType) {
      query += `AND jobOffers.job_type = $${values.length + 1}`;
      values.push(jobType);
    }

    if (experienceLevel) {
      query += `AND jobOffers.experience_level = $${values.length + 1}`;
      values.push(experienceLevel);
    }

    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving filtered job offers", error);
    res.status(500).send("Error retrieving filtered job offers");
  }
});
