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
import {
  validateRequest,
  getJobOfferByIdValidation,
  createNewJobOfferValidation,
  deleteJobOfferValidation,
  updateJobOfferValidation,
  getJobOffers,
} from "../middleware/validationMiddleware";
import client from "../config/database";

export const router = express.Router();

router.post(
  "/jobs",
  validateRequest(createNewJobOfferValidation),
  async (req, res) => {
    try {
      //req.query.salary
      const {
        title,
        logo,
        description,
        location,
        companyId,
        experienceLevelId,
        jobTypeId,
        salaryRangeId,
      } = req.body;
      const job = await createNewJobOffer(
        title,
        logo,
        description,
        location,
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
      const { title, description, location } = req.body;
      const job = await updateJobOffer(
        jobOfferId,
        title,
        location,
        description
      );
      res.send(job);
    } catch (error) {
      res.status(500).send("Error updating job");
    }
  }
);

router.get("/jobs/filter", validateRequest(getJobOffers), async (req, res) => {
  try {
    const { minSalary, maxSalary, jobType, experienceLevel } = req.query;

    let query = `
        SELECT 
          job_offers.id,
          job_offers.title,
          job_offers.description,
          job_offers.salary,
          job_offers.experience_level,
          job_offers.job_type,
          job_offers.applicants_count,
          job_offers.created_at,
          companies.name AS company_name,
          companies.logo_url AS company_logo
        FROM job_offers
        JOIN companies ON job_offers.company_id = companies.id
        WHERE 1=1
      `;
    const values: any[] = [];

    if (minSalary && maxSalary) {
      query += `AND job_offers.salary BETWEEN $${values.length + 1} AND $${
        values.length + 2
      }`;
      values.push(Number(minSalary), Number(maxSalary));
    }

    if (jobType) {
      query += `AND job_offers.job_type = $${values.length + 1}`;
      values.push(jobType);
    }

    if (experienceLevel) {
      query += `AND job_offers.experience_level = $${values.length + 1}`;
      values.push(experienceLevel);
    }

    console.log("Query:", query);
    console.log("Values:", values);

    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving filtered job offers", error);
    res.status(500).send("Error retrieving filtered job offers");
  }
});
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
// porque é que tive que meter getjobofferbyidvalidation depois de
