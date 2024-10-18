import client from "../config/database";

export const getAllApplication = async () => {
  try {
    const result = await client.query("SELECT * FROM application");
    return result;
  } catch (error) {
    console.log("error retrieving application");
    throw new Error("error retrieving application");
  }
};

export const getAllApplicationbyId = async (applicationId: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM application WHERE applicationId=$1",
      [applicationId]
    );
    return result;
  } catch (error) {
    console.log("application doesnt exist");
    throw new Error("application doesnt exist");
  }
};

export const createNewApplication = async (
  name: string,
  cover_letter: string,
  resume: string,
  job_offer_id: string,
  company_id: string
) => {
  try {
    const result = await client.query(
      " INSERT INTO application(name,cover_letter,resume,job_offer_id,company_id) VALUES ($1, $2, $3, $4, $5)",
      [name, cover_letter, resume, job_offer_id, company_id]
    );
    return result;
  } catch (error) {
    console.log("Application creation failed");
    throw new Error("Application creation failed");
  }
};

export const deleteApplication = async (applicationId: string) => {
  try {
    const result = await client.query(
      "DELETE FROM application WHERE applicationId=$1",
      [applicationId]
    );
    return result;
  } catch (error) {
    console.log("Application deleted");
    throw new Error("Application deleted");
  }
};

export const updateAplicationCoverLetter = async (
  cover_letter: string,
  applicationId: string
) => {
  try {
    const result = await client.query(
      "SELECT * FROM application (cover_letter, applicationId) VALUES ($1,$2), [cover_letter, applicationId]"
    );
    return result;
  } catch (error) {
    console.log("Error updating application");
    throw new Error("Error updating application");
  }
};

export const updateAplicationResume = async (
  resume: string,
  applicationId: string
) => {
  try {
    const result = await client.query(
      "SELECT * FROM application (resume, applicationId) VALUES ($1,$2), [resume, applicationId]"
    );
    return result;
  } catch (error) {
    console.log("Error updating application");
    throw new Error("Error updating application");
  }
};

type statusType = "pending" | "approved" | "rejected" | "reviewing"; // fazer tipo status

export const updateApplicationStatus = async (
  status: statusType,
  applicationId: string
) => {
  try {
    const result = await client.query(
      "SELECT * FROM application (status, applicationId) VALUES ($1,$2), [status, applicationId]"
    );
    return result;
  } catch (error) {
    console.log("Error updating application status");
    throw new Error("Error updating application status");
  }
};
