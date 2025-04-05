import client from "../config/database";

export const getAllJobOffers = async () => {
  try {
    const result = await client.query("SELECT * FROM job_offers");
    return result;
  } catch (error) {
    console.log("Error retrieving job offers");
    throw new Error("Error retrieving job offers");
  }
};

export const getJobOfferById = async (jobOfferId: string) => {
  try {
    const result = await client.query("SELECT * FROM job_offers WHERE id=$1", [
      jobOfferId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Job offer doesnt exist");
    throw new Error("Job offer doesnt exist");
  }
};

export const createNewJobOffer = async (
  title: string,
  description: string,
  logo: string,
  companyId: number,
  experienceLevelId: string[],
  location: string,
  jobTypeId: string[],
  salary: number
) => {
  try {
    console.log(
      1,
      title,
      logo,
      experienceLevelId,
      jobTypeId,
      salary,
      description,
      location,
      companyId
    );
    const result = await client.query(
      `
      INSERT INTO job_offers (title, logo, experienceLevelId, jobTypeId, salary, description, location, company_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `,
      [
        title,
        logo,
        experienceLevelId.join(","),
        jobTypeId.join(","),
        salary,
        description,
        location,
        companyId,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating job offer", error);
    throw new Error("Error creating job offer");
  }
};

export const deleteJobOffer = async (jobOfferId: string) => {
  try {
    const result = await client.query("DELETE FROM job_offers WHERE id=$1", [
      jobOfferId,
    ]);
    return result.rows;
  } catch (error) {
    console.log("Job offer deleted");
    throw new Error("Job offer deleted");
  }
};

export const updateJobOffer = async (
  jobOfferId: string,
  title: string,
  description: string,
  location: string
) => {
  try {
    const result = await client.query(
      "UPDATE job_offers SET title=$1, description=$2, location=$3 WHERE id=$4",
      [title, description, location, jobOfferId]
    );
    return result.rows;
  } catch (error) {
    console.log("Job offer update failed");
    throw new Error("Job offer update failed");
  }
};

export const getJobOffersBySalaryRange = async (
  minSalary: number,
  maxSalary: number
) => {
  try {
    const result = await client.query(
      `
      SELECT 
        job_offers.id,
        job_offers.title,
        job_offers.logo,
        job_offers.description,
        job_offers.location,
        job_offers.salary,
        job_offers.experienceLevelId,
        job_offers.jobTypeId,
        job_offers.applicants_count,
        job_offers.created_at,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM job_offers
      JOIN companies ON job_offers.company_id = companies.id
      WHERE job_offers.salary BETWEEN $1 AND $2
    `,
      [minSalary, maxSalary]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by salary range", error);
    throw new Error("Error retrieving job offers by salary range");
  }
};

export const getJobOffersByJobType = async (jobType: string) => {
  try {
    const result = await client.query(
      `SELECT 
        job_offers.id,
        job_offers.title,
        job_offers.logo,
        job_offers.description,
        job_offers.location,
        job_offers.salary,
        job_offers.experienceLevelId,
        job_offers.jobTypeId,
        job_offers.applicants_count,
        job_offers.created_at,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM job_offers
      JOIN companies ON job_offers.company_id = companies.id
      WHERE job_offers.jobTypeId = $1`,
      [jobType]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by job type", error);
    throw new Error("Error retrieving job offers by job type");
  }
};

export const getJobOfferByExperienceLevel = async (experienceLevel: string) => {
  try {
    const result = await client.query(
      `SELECT 
        job_offers.id,
        job_offers.title,
        job_offers.logo,
        job_offers.description,
        job_offers.location,
        job_offers.salary,
        job_offers.experienceLevelId,
        job_offers.jobTypeId,
        job_offers.applicants_count,
        job_offers.created_at,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM job_offers
      JOIN companies ON job_offers.company_id = companies.id
      WHERE job_offers.experienceLevelId = $1`,
      [experienceLevel]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by experience level", error);
    throw new Error("Error retrieving job offers by experience level");
  }
};

export const getJobOfferCandidates = async (jobOfferId: string) => {
  try {
    const result = await client.query(
      `SELECT 
        u.firstName AS candidate_firstName,
        u.lastName AS candidate_lastName,
        u.email AS candidate_email,
        a.status AS application_status
      FROM application a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_offer_id = $1`,
      [jobOfferId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offer candidates", error);
    throw new Error("Error retrieving job offer candidates");
  }
};

export const getJobOffersByLocation = async (location: string) => {
  try {
    const result = await client.query(
      `SELECT 
        job_offers.id,
        job_offers.title,
        job_offers.logo,
        job_offers.description,
        job_offers.location,
        job_offers.salary,
        job_offers.experienceLevelId,
        job_offers.jobTypeId,
        job_offers.applicants_count,
        job_offers.created_at,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM job_offers
      JOIN companies ON job_offers.company_id = companies.id
      WHERE job_offers.location = $1`,
      [location]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by location", error);
    throw new Error("Error retrieving job offers by location");
  }
};

export const getJobOffersByCompany = async (companyId: number) => {
  try {
    console.log(`Fetching ofertas para empresa ID: ${companyId}`);
    const result = await client.query(
      `SELECT 
         job_offers.id,
         job_offers.title,
         job_offers.logo,
         job_offers.description,
         job_offers.location,
         job_offers.salary,
         job_offers.experienceLevelId,
         job_offers.jobTypeId,
         job_offers.applicants_count,
         job_offers.created_at,
         companies.name AS company_name,
         companies.logo_url AS company_logo
       FROM job_offers
       JOIN companies ON job_offers.company_id = companies.id
       WHERE job_offers.company_id = $1`,
      [companyId]
    );
    console.log(
      `Encontradas ${result.rows.length} ofertas para empresa ${companyId}`
    );

    console.log("Ofertas:", JSON.stringify(result.rows));
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by company", error);
    throw new Error("Error retrieving job offers by company");
  }
};
