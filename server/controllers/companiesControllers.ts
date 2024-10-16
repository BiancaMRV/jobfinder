import client from "../config/database";

export const getAllCompanies = async () => {
  try {
    const result = await client.query("SELECT * FROM companies");
    return result;
  } catch (error) {
    console.error("Error retrieving companies ");
    throw new Error("Error retrieving companies");
  }
};

export const getAllCompaniesById = async (companyId: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM application WHERE companiesId=$1"
    );
    return result;
  } catch (error) {
    console.error("Company doesnt exist");
    throw new Error("Company doesnt exist");
  }
};

export const createNewCompany = async (
  companyId: string,
  description: string
) => {
  try {
    const result = await client.query(
      "INSERT INTO companies(companyId, description) VALUES ($1, $2)",
      [companyId, description]
    );
    return result;
  } catch (error) {
    console.log("Company creation failed");
    throw new Error("Company creation failed");
  }
};

export const deleteCompany = async (companyId: string) => {
  try {
    const result = await client.query(
      "DELETE FROM companies WHERE companyId=$1",
      [companyId]
    );
    return result;
  } catch (error) {
    console.log("Company deleted");
    throw new Error("Company deleted");
  }
};
export const updateCompany = async (companyId: string, description: string) => {
  try {
    const result = await client.query(
      "UPDATE companies SET description=$1 WHERE companyId=$2",
      [description, companyId]
    );
    return result;
  } catch (error) {
    console.error("Company not updated", error);
    throw new Error("Company not updated");
  }
};
