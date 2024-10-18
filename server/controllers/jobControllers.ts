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
  company_id: string
) => {
  try {
    const result = await client.query(
      "INSERT INTO jobOffers(title, description, company_id) VALUES ($1, $2, $3)",
      [title, description, company_id]
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
