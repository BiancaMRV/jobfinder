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
    const result = await client.query("SELECT * FROM companies WHERE id=$1");
    return result;
  } catch (error) {
    console.error("Company doesnt exist");
    throw new Error("Company doesnt exist");
  }
};

export const createNewCompany = async (name: string) => {
  try {
    const result = await client.query(
      "INSERT INTO companies(name) VALUES ($1)",
      [name]
    );
    return result;
  } catch (error) {
    console.log("Company creation failed");
    throw new Error("Company creation failed");
  }
};

export const searchCompany = async (name: string) => {
  try {
    const result = await client.query("SELECT * FROM companies WHERE name=$1", [
      name,
    ]);
    return result;
  } catch (error) {
    console.error("Company not found");
    throw new Error("Company not found");
  }
};

export const deleteCompany = async (companyId: string) => {
  try {
    const result = await client.query("DELETE FROM companies WHERE id=$1", [
      companyId,
    ]);
    return result;
  } catch (error) {
    console.log("Company deleted");
    throw new Error("Company deleted");
  }
};
export const updateCompany = async (companyId: string, name: string) => {
  try {
    const result = await client.query(
      "UPDATE companies SET name=$2 WHERE id=$1",
      [companyId, name]
    );
    return result;
  } catch (error) {
    console.error("Company not updated", error);
    throw new Error("Company not updated");
  }
};

export const getAllJobOffersFromCompany = async (companyId: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM job_offers WHERE company_id=$1",
      [companyId]
    );
    return result;
  } catch (error) {
    console.error("Error retrieving job offers from company");
    throw new Error("Error retrieving job offers from company");
  }
};
