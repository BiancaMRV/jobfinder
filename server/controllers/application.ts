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
// TODO: CRIAR AS TABELAS DE EDITFILES, EDITSTATUS
