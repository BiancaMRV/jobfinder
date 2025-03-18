import { password } from "bun";
import client from "./database";

async function seedDatabase() {
  try {
    // Seed Users
    const hashedPassword = "test";
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: hashedPassword,
        currentJob: "Software Engineer",
        isWorking: "true",
        role: "jobSeeker",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: hashedPassword,
        currentJob: "Product Manager",
        isWorking: "true",
        role: "jobSeeker",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "biancamargarida2014@gmail.com",
        password: hashedPassword,
        currentJob: "Data Scientist",
        isWorking: "true",
        role: "jobSeeker",
      },
      {
        firstName: "Tech",
        lastName: "Admin",
        email: "tech@example.com",
        password: hashedPassword,
        currentJob: "",
        isWorking: "false",
        role: "company",
      },
      {
        firstName: "Global",
        lastName: "Consulting",
        email: "global@example.com",
        password: hashedPassword,
        currentJob: "",
        isWorking: "false",
        role: "company",
      },
      {
        firstName: "UpHold",
        lastName: "Manager",
        email: "uphold@example.com",
        password: hashedPassword,
        currentJob: "",
        isWorking: "false",
        role: "company",
      },
    ];

    const userInsertQuery = `
      INSERT INTO users (firstName, lastName, email, password, currentJob, isWorking, role) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;
    const companyUserIds: number[] = [];

    for (const user of users) {
      const usersResult = await client.query(userInsertQuery, [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.currentJob,
        user.isWorking,
        user.role,
      ]);

      const userId = usersResult.rows[0].id;

      if (user.role === "company") {
        companyUserIds.push(userId);
      } //se for um usuario de empresa adiciona o id do usuario ao array companyUserIds, armazena o ID
    }
    const companies = [
      {
        name: "Tech Innovations Inc.",
        description:
          "Leading technology company focused on innovative solutions",
        logo_url: "./logo.svg",
        location: "Braga",
        user_id: companyUserIds[0],
      },
      {
        name: "Global Consulting Group",
        description:
          "International consulting firm providing strategic business solutions",
        logo_url: "./logo.svg",
        location: "Porto",
        user_id: companyUserIds[1],
      },
      {
        name: "UpHold",
        description:
          "International consulting firm providing strategic business solutions",
        logo_url: "./logo.svg",
        location: "Barcelos",
        user_id: companyUserIds[2],
      },
    ];

    const companyInsertQuery = `
      INSERT INTO companies (name, description, logo_url, location, user_id) 
      VALUES ($1, $2, $3, $4,$5)
    `;

    for (const company of companies) {
      await client.query(companyInsertQuery, [
        company.name,
        company.description,
        company.logo_url,
        company.location,
        company.user_id,
      ]);
    }

    // Seed Job Offers
    const job_offers = [
      {
        title: "Senior Software Engineer",
        logo: "./logo.svg",
        experienceLevelId: ["mid"],
        jobTypeId: ["freelance"],
        salary: 120000.0,
        description: `
**About the role:**
Join a dynamic team to design, develop, and maintain high-performance software applications that scale globally. Collaborate with cross-functional teams to deliver impactful solutions and drive innovation.
    
**Responsibilities:**
- Architect and implement complex backend services and APIs.
- Work closely with frontend developers to ensure seamless integration.
- Mentor junior developers and contribute to the team's growth.
    
**Required Skills:**
- Proficiency in Node.js, TypeScript, and cloud platforms.
- Experience with RESTful APIs and microservices architecture.
- Strong debugging and optimization skills.
        `,
        companyId: 1,
        location: "Braga",
        jobOfferId: 1,
      },
      {
        title: "Sr. UX Designer",
        logo: "./logo-ux.svg",
        experienceLevelId: ["senior"],
        jobTypeId: ["part-time"],
        salary: 65000.0,
        description: `
**About the role:**
Help shape the user experience for millions of users by designing intuitive interfaces for a leading global platform. Collaborate with stakeholders to create user-centric designs.
    
**Responsibilities:**
- Create wireframes, interactive prototypes, and high-fidelity designs.
- Conduct user research and usability testing to refine designs.
- Collaborate with developers to implement seamless user experiences.
    
**Required Skills:**
- Proficiency in Figma, Adobe XD, and wireframing tools.
- Strong knowledge of UX/UI design principles.
- Excellent communication and teamwork skills.
        `,
        companyId: 2,
        location: "San Francisco",
        jobOfferId: 2,
      },
      {
        title: "Junior Backend Developer",
        logo: "./logo-backend.svg",
        experienceLevelId: ["entry", "mid"],
        jobTypeId: ["full-time"],
        salary: 40000.0,
        description: `
**About the role:**
Kickstart your career by joining a supportive team of experienced developers. Build and maintain scalable backend services that support our growing product base.
    
**Responsibilities:**
- Develop and maintain backend APIs and services.
- Collaborate with frontend teams to integrate APIs.
- Participate in code reviews and agile development processes.
    
**Required Skills:**
- Familiarity with Node.js, Python, or similar backend technologies.
- Understanding of database systems (SQL/NoSQL).
- Passion for learning and problem-solving.
        `,
        companyId: 3,
        location: "Porto",
        jobOfferId: 3,
      },
    ];

    const jobOfferInsertQuery = `
      INSERT INTO job_offers (
        title, logo, experienceLevelId, location, jobTypeId, 
        salary, description, company_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
    `;

    for (const jobOffer of job_offers) {
      await client.query(jobOfferInsertQuery, [
        jobOffer.title,
        jobOffer.logo,
        jobOffer.experienceLevelId.join(","),
        jobOffer.location,
        jobOffer.jobTypeId.join(","),
        jobOffer.salary,
        jobOffer.description,
        jobOffer.companyId,
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
