import type { NextFunction, Request, RequestHandler, Response } from "express";
import client from "../config/database";
//TODO: implementar mulder para upload de ficheiros

export const getAllApplication = async () => {
  try {
    const result = await client.query("SELECT * FROM application");
    return result;
  } catch (error) {
    console.log("error retrieving application");
    throw new Error("error retrieving application");
  }
};

export const getApplicationById = async (applicationId: string) => {
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
  user_id: number,
  cover_letter: string,
  resume: string,
  job_offer_id: string,
  company_id: string
) => {
  try {
    const result = await client.query(
      "INSERT INTO application(user_id,cover_letter,resume,job_offer_id,company_id) VALUES ($1, $2, $3, $4, $5)",
      [user_id, cover_letter, resume, job_offer_id, company_id]
    );
    return result;
  } catch (error) {
    console.log("Application creation failed", error);
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

export const updateApplicationCoverLetter = async (
  cover_letter: string,
  applicationId: string
) => {
  try {
    const result = await client.query(
      "UPDATE application SET cover_letter = $1 WHERE applicationId = $2",
      [cover_letter, applicationId]
    );
    return result;
  } catch (error) {
    console.log("Error updating application");
    throw new Error("Error updating application");
  }
};

// Update resume
export const updateApplicationResume = async (
  resume: string,
  applicationId: string,
  userId: number
) => {
  try {
    const result = await client.query(
      "UPDATE application SET resume = $1 WHERE applicationId = $2 AND userId = $3",
      [resume, applicationId, userId]
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
  applicationId: string,
  userId: number
) => {
  try {
    const result = await client.query(
      "SELECT * FROM application (status, applicationId, userId) VALUES ($1,$2,$3)",
      [status, applicationId, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("application not found can't update");
    }

    return result;
  } catch (error) {
    console.log("Error updating application status");
    throw new Error("Error updating application status");
  }
};

export const updateApplicationStatus1 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, applicationId } = req.body;
    const userId = req.userId;

    const result = await client.query(
      "SELECT * FROM application (status, applicationId, userId) VALUES ($1,$2,$3)",
      [status, applicationId, userId]
    );

    if (result.rows.length === 0)
      res.status(404).send("application not found can't update");

    res.send(result);
  } catch (error) {
    console.log("Error updating application status");
    res.status(500).send("Error updating application status");
  }
};
export const getApplicationStats = async (userId: number) => {
  try {
    const result = await client.query(
      `
      SELECT 
        COUNT(*) as total_applications,
        COUNT(CASE WHEN status = 'reviewing' THEN 1 END) as total_interviews,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as total_offers,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as total_rejections,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as total_pending
      FROM application 
      WHERE userId = $1
    `,
      [userId]
    );

    if (result.rows.length === 0) {
      return {
        total_applications: 0,
        total_interviews: 0,
        total_offers: 0,
        total_rejections: 0,
        total_pending: 0,
      };
    }

    return result.rows[0];
  } catch (error) {
    console.log("Error getting application stats:", error);
    throw new Error("Error getting application stats");
  }
};

export const getCandidatesfromApplication = async (applicationId: string) => {
  try {
    const result = await client.query(
      `
      SELECT 
        u.name AS candidate_name,
        u.email AS candidate_email,
        a.status AS application_status
      FROM application a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = $1
    `,
      [applicationId]
    );

    return result.rows;
  } catch (error) {
    console.log("Error getting candidates from application:", error);
    throw new Error("Error getting candidates from application");
  }
};
