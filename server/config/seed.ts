import { password } from "bun";
import client from "./database";

async function seedDatabase() {
  try {
    // Seed Users
    const hashedPassword = "test";
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        currentJob: "Software Engineer",
        isWorking: "true",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        currentJob: "Product Manager",
        isWorking: "true",
      },
      {
        name: "Alice Johnson",
        email: "biancamargarida2014@gmail.com",
        password: hashedPassword,
        currentJob: "Data Scientist",
        isWorking: "true",
      },
    ];

    const userInsertQuery = `
      INSERT INTO users (name, email, password, currentJob, isWorking) 
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const user of users) {
      await client.query(userInsertQuery, [
        user.name,
        user.email,
        user.password,
        user.currentJob,
        user.isWorking,
      ]);
    }

    // Seed Companies
    const companies = [
      {
        name: "Tech Innovations Inc.",
        description:
          "Leading technology company focused on innovative solutions",
        logo_url: "./logo.svg",
        location: "Braga",
      },
      {
        name: "Global Consulting Group",
        description:
          "International consulting firm providing strategic business solutions",
        logo_url: "./logo.svg",
        location: "Porto",
      },
      {
        name: "UpHold",
        description:
          "International consulting firm providing strategic business solutions",
        logo_url: "./logo.svg",
        location: "Barcelos",
      },
    ];

    const companyInsertQuery = `
      INSERT INTO companies (name, description, logo_url, location) 
      VALUES ($1, $2, $3, $4)
    `;

    for (const company of companies) {
      await client.query(companyInsertQuery, [
        company.name,
        company.description,
        company.logo_url,
        company.location,
      ]);
    }

    // Seed Job Offers
    const jobOffers = [
      {
        title: "Senior Software Engineer",
        logo: "./logo.svg",
        experience_level: "Mid Level",
        job_type: "Freelance",
        salary: 120000.0,
        description:
          "We are seeking an experienced software engineer to join our innovative team.",
        company_id: 1,
        location: "Braga",
        jobOfferId: 1,
      },
      {
        title: "Product Manager",
        logo: "./logo.svg",
        experience_level: "Entry Level",
        job_type: "Full Time",
        salary: 95000.0,
        description:
          "Looking for a strategic product manager to drive our product development.",
        company_id: 2,
        location: "Braga",
        jobOfferId: 2,
      },
      // TODO: implementar a insercao de mais que um filtro do mesmo parametro

      {
        title: "Data Scientist",
        logo: "./logo.svg",
        experience_level: "Lead",
        job_type: "Internship",
        salary: 150000.0,
        description:
          "We are seeking a data scientist to lead our data analytics team.",
        company_id: 3,
        location: "Porto",
        jobOfferId: 3,
      },
    ];

    const jobOfferInsertQuery = `
      INSERT INTO job_offers (
        title, logo, experience_level, location, job_type, 
        salary, description, company_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
    `;

    for (const jobOffer of jobOffers) {
      await client.query(jobOfferInsertQuery, [
        jobOffer.title,
        jobOffer.logo,
        jobOffer.experience_level,
        jobOffer.location,
        jobOffer.job_type,
        jobOffer.salary,
        jobOffer.description,
        jobOffer.company_id,
      ]);
    }

    // Seed Posts
    const posts = [
      {
        title: "Career Development Strategies",
        content:
          "In today't competitive job market, continuous learning is key to professional growth...",
        tags: [1, 2, 3],
      },
      {
        title: "Technology Trends in 2024",
        content:
          "Artificial Intelligence and Machine Learning continue to reshape industries...",
        tags: [4, 5, 6],
      },
      {
        title: "The Future of Work",
        content:
          "Remote work and digital transformation are changing the way we work...",
        tags: [7, 8, 9],
      },
    ];

    const postInsertQuery = `
      INSERT INTO posts (title, content, tags) 
      VALUES ($1, $2, $3)
    `;

    for (const post of posts) {
      await client.query(postInsertQuery, [
        post.title,
        post.content,
        post.tags,
      ]);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await client.end(); // Close the database connection
  }
}

export default seedDatabase;
