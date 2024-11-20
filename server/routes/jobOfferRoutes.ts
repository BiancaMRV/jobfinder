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

router.get("/jobs/filter/minsalary/maxsalary", async (req, res) => {
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
});

router.get(
  "/jobs/filter/fulltime/partime/internship/voluntering",
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

router.get("/jobs/filter/entry/intermediate/senior", async (req, res) => {
  try {
    const { entry, intermediate, senior } = req.query;
    const jobs = await getJobOfferByExperienceLevel(
      entry as string,
      intermediate as string,
      senior as string
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send("Error retrieving jobs by experience level");
  }
});
