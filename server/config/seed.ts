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
        logo_url: "https://example.com/tech-innovations-logo.png",
      },
      {
        name: "Global Consulting Group",
        description:
          "International consulting firm providing strategic business solutions",
        logo_url: "https://example.com/global-consulting-logo.png",
      },
    ];

    const companyInsertQuery = `
      INSERT INTO companies (name, description, logo_url) 
      VALUES ($1, $2, $3)
    `;

    for (const company of companies) {
      await client.query(companyInsertQuery, [
        company.name,
        company.description,
        company.logo_url,
      ]);
    }

    // Seed Job Offers
    const jobOffers = [
      {
        title: "Senior Software Engineer",
        logo: "https://example.com/tech-innovations-logo.png",
        experience_level: "Senior",
        job_type: "Full Time",
        salary: 120000.0,
        description:
          "We are seeking an experienced software engineer to join our innovative team.",
        company_id: 1,
      },
      {
        title: "Product Manager",
        logo: "https://example.com/global-consulting-logo.png",
        experience_level: "entry",
        job_type: "Full Time",
        salary: 95000.0,
        description:
          "Looking for a strategic product manager to drive our product development.",
        company_id: 2,
      },
    ];

    const jobOfferInsertQuery = `
      INSERT INTO job_offers (
        title, logo, experience_level, job_type, 
        salary, description, company_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const jobOffer of jobOffers) {
      await client.query(jobOfferInsertQuery, [
        jobOffer.title,
        jobOffer.logo,
        jobOffer.experience_level,
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
