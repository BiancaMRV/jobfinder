import client from "../config/database";

export const getAllCompanies = async () => {
  try {
    const result = await client.query("SELECT * FROM companies");
    return result;
  } catch (error) {
    console.error("Error retrieving companies:", error);
    throw new Error("Error retrieving companies");
  }
};

export const getAllCompaniesById = async (companyId: number) => {
  try {
    const result = await client.query("SELECT * FROM companies WHERE id=$1", [
      companyId,
    ]);
    return result;
  } catch (error) {
    console.error("Error getting company by ID:", error);
    throw new Error("Company doesn't exist");
  }
};

export const getAllCompaniesByUserId = async (userId: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM companies WHERE user_id=$1",
      [userId]
    );
    console.log(`Empresas encontradas para usuário ${userId}:`, result.rows);
    return result;
  } catch (error) {
    console.error("Error getting company by userId:", error);
    throw new Error("Error retrieving company");
  }
};

export const createNewCompany = async (
  name: string,
  location: string = "",
  email: string = "",
  description: string = "",
  userId: number
) => {
  try {
    console.log(
      `Criar nova empresa: name=${name}, location=${location}, email=${email},description=${description}, userId=${userId}`
    );

    const result = await client.query(
      "INSERT INTO companies(name, location, email,description, user_id) VALUES ($1, $2, $3, $4,$5) RETURNING *",
      [name, location, email, description, userId]
    );

    console.log("Empresa criada com sucesso:", result.rows[0]);
    return result;
  } catch (error) {
    console.error("Company creation failed:", error);
    throw new Error(
      `Company creation failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const searchCompany = async (name: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM companies WHERE name ILIKE $1",
      [`%${name}%`]
    );
    return result;
  } catch (error) {
    console.error("Error searching company:", error);
    throw new Error("Error searching company");
  }
};

export const deleteCompany = async (companyId: number) => {
  try {
    const result = await client.query(
      "DELETE FROM companies WHERE id=$1 RETURNING *",
      [companyId]
    );
    return result;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw new Error("Error deleting company");
  }
};

export const updateCompany = async (
  companyId: number,
  name: string,
  location: string = "",
  email: string = ""
) => {
  try {
    let query = "UPDATE companies SET ";
    const values = [];
    const updateFields = [];
    let paramIndex = 1;

    if (name) {
      updateFields.push(`name=$${paramIndex}`);
      values.push(name);
      paramIndex++;
    }

    if (location) {
      updateFields.push(`location=$${paramIndex}`);
      values.push(location);
      paramIndex++;
    }

    if (email) {
      updateFields.push(`email=$${paramIndex}`);
      values.push(email);
      paramIndex++;
    }

    query += updateFields.join(", ") + ` WHERE id=$${paramIndex} RETURNING *`;
    values.push(companyId);

    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.error("Error updating company:", error);
    throw new Error("Error updating company");
  }
};

export const getAllJobOffersFromCompany = async (companyId: number) => {
  try {
    const result = await client.query(
      "SELECT * FROM job_offers WHERE company_id=$1 ORDER BY created_at DESC",
      [companyId]
    );
    return result;
  } catch (error) {
    console.error("Error retrieving job offers from company:", error);
    throw new Error("Error retrieving job offers from company");
  }
};

export const getCompanyJobStats = async (companyId: number) => {
  try {
    const activeJobsResult = await client.query(
      "SELECT COUNT(*) FROM job_offers WHERE company_id=$1 AND status='active'",
      [companyId]
    );

    const applicationsResult = await client.query(
      "SELECT COUNT(*) FROM applications WHERE job_offer_id IN (SELECT id FROM job_offers WHERE company_id=$1)",
      [companyId]
    );

    const interviewsResult = await client.query(
      "SELECT COUNT(*) FROM applications WHERE job_offer_id IN (SELECT id FROM job_offers WHERE company_id=$1) AND status='interview'",
      [companyId]
    );

    return {
      total_activejobs: parseInt(activeJobsResult.rows[0]?.count || "0"),
      total_application: parseInt(applicationsResult.rows[0]?.count || "0"),
      total_interviews: parseInt(interviewsResult.rows[0]?.count || "0"),
    };
  } catch (error) {
    console.error("Error getting job stats:", error);
    throw new Error("Error retrieving job stats");
  }
};
