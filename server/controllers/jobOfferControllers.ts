import client from "../config/database";

export const getAllJobOffers = async () => {
  try {
    const result = await client.query("SELECT * FROM jobOffers");
    return result;
  } catch (error) {
    console.log("Error retrieving job offers");
    throw new Error("Error retrieving job offers");
  }
};

// "SELECT * FROM jobOffers WHERE jobtype=fulltime "
//"SELECT * FROM jobOffers WHERE experiencelevel=intermediate"
//"SELECT * FROM jobOffers WHERE hourly_rate BETWEEN $1 AND $2"
//"JOIN companies ON jobOffers.company_id = companies.id"

export const getJobOfferById = async (jobOfferId: string) => {
  try {
    const result = await client.query("SELECT * FROM jobOffers WHERE id=$1", [
      jobOfferId,
    ]);
    return result;
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
  experienceLevelId: number,
  location: string,
  jobTypeId: number,
  salaryRangeId: number
) => {
  try {
    const result = await client.query(
      `
      INSERT INTO job_offers (title, description,logo, company_id, experience_level_id, location,job_type_id, salary_range_id)
      VALUES ($1, $2, $3, $4, $5, $6,$7,$8)

      RETURNING *;
      `,
      [
        title,
        description,
        logo,
        companyId,
        experienceLevelId,
        location,
        jobTypeId,
        salaryRangeId,
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
    const result = await client.query(
      "DELETE FROM jobOffers WHERE jobOfferId=$1",
      [jobOfferId]
    );
    return result;
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
      "UPDATE jobOffers SET title=$1, description=$2, location=$3 WHERE jobOfferId=$3",
      [title, description, location, jobOfferId]
    );
    return result;
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
        jobOffers.id,
        jobOffers.title,
        jobOffers.logo,
        jobOffers.description,
        jobOffers.location,
        jobOffers.hourly_rate,
        jobOffers.experience_level,
        jobOffers.job_type,
        jobOffers.applicants_count,
        jobOffers.posted_date,
        companies.name AS company_name,
        companies.logo_url AS company_logo
      FROM jobOffers
      JOIN companies ON jobOffers.company_id = companies.id
      WHERE jobOffers.hourly_rate BETWEEN $1 AND $2
    `,
      [minSalary, maxSalary]
    ); // Passa os valores para o SQL
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by salary range", error);
    throw new Error("Error retrieving job offers by salary range");
  }
};

export const getJobOffersByJobType = async (
  fulltime: string,
  partime: string,
  internship: string,
  voluntering: string
) => {
  try {
    const result = await client.query(
      `SELECT 
      jobOffers.id,
      jobOffers.title,
      jobOffers.logo,
      jobOffers.description,
      jobOffers.hourly_rate,
      jobOffers.experience_level,
      jobOffers.job_type,
      jobOffers.applicants_count,
      jobOffers.posted_date,
      companies.name AS company_name,
      companies.logo_url AS company_logo
    FROM jobOffers
    JOIN companies ON jobOffers.company_id = companies.id
    WHERE jobOffers.hourly_rate BETWEEN $1 AND $2`,
      [fulltime, partime, internship, voluntering]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by job type", error);
    throw new Error("Error retrieving job offers by job type");
  }
};

export const getJobOfferByExperienceLevel = async (
  entry: string,
  intermediate: string,
  senior: string
) => {
  try {
    const result = await client.query(
      `SELECT 
      jobOffers.id,
      jobOffers.title,
      JobOffers.logo,
      jobOffers.description,
      jobOffers.hourly_rate,
      jobOffers.experience_level,
      jobOffers.job_type,
      jobOffers.applicants_count,
      jobOffers.posted_date,
      companies.name AS company_name,
      companies.logo_url AS company_logo
    FROM jobOffers
    JOIN companies ON jobOffers.company_id = companies.id
    WHERE jobOffers.hourly_rate BETWEEN $1 AND $2`,
      [entry, intermediate, senior]
    );
  } catch (error) {
    console.error("Error retrieving job offers by experience level", error);
    throw new Error("Error retrieving job offers by experience level");
  }
};

export const getJobOffersByLocation = async (location: string) => {
  try {
    const result = await client.query(
      `SELECT 
      jobOffers.id,
      jobOffers.title,
      jobOffers.logo,
      jobOffers.description,
      jobOffers.hourly_rate,
      jobOffers.experience_level,
      jobOffers.location,
      jobOffers.job_type,
      jobOffers.applicants_count,
      jobOffers.posted_date,
      companies.name AS company_name,
      companies.logo_url AS company_logo
    FROM jobOffers
    JOIN companies ON jobOffers.company_id = companies.id
    WHERE jobOffers.location=$1`,
      [location]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving job offers by location", error);
    throw new Error("Error retrieving job offers by location");
  }
};
