import client from "../config/database";

export const getAllJobOffers = async () => {
  try {
    const result = await client.query("SELECT *FROM jobOffers");
    return result;
  } catch (error) {
    console.log("Error retrieving job offers");
    throw new Error("Error retrieving job offers");
  }
};

export const getJobOfferById = async (jobOfferId: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM jobOffers WHERE jobOfferId=$1",
      [jobOfferId]
    );
    return result;
  } catch (error) {
    console.log("Job offer doesnt exist");
    throw new Error("Job offer doesnt exist");
  }
};

export const createNewJobOffer = async (
  job_offer_id: string,
  title: string,
  description: string,
  company_id: string
) => {
  try {
    const result = await client.query(
      "INSERT INTO jobOffers(job_offer_id, title, description, company_id) VALUES ($1, $2, $3, $4)",
      [job_offer_id, title, description, company_id]
    );
    return result;
  } catch (error) {
    console.log("Job offer creation failed");
    throw new Error("Job offer creation failed");
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
  description: string
) => {
  try {
    const result = await client.query(
      "UPDATE jobOffers SET title=$1, description=$2 WHERE jobOfferId=$3",
      [title, description, jobOfferId]
    );
    return result;
  } catch (error) {
    console.log("Job offer update failed");
    throw new Error("Job offer update failed");
  }
};

export const getJobOfferByCompanyId = async (
  company_id: string,
  job_offer_id: string
) => {
  try {
    const result = await client.query(
      "SELECT * FROM jobOffers WHERE company_id=$1 AND job_offer_id=$2",
      [company_id, job_offer_id]
    );
    return result;
  } catch (error) {
    console.log("Job offer doesnt exist");
    throw new Error("Job offer doesnt exist");
  }
};
