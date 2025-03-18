import styles from "./JobApplication.module.css";
import { jobTypes } from "../jobs/JobCard/JobCards";
import { useState, ChangeEvent, FormEvent } from "react";
import { JobType } from "../jobs/types";

export default function JobApplication() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: [] as string[],
    salary: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleJobTypeChange = (selectedJobType: string) => {
    setFormData((prevState) => {
      const currentJobTypes = [...prevState.jobType];

      if (currentJobTypes.includes(selectedJobType)) {
        return {
          ...prevState,
          jobTypes: currentJobTypes.filter((type) => type !== selectedJobType),
        };
      } else {
        return {
          ...prevState,
          jobTypes: [...currentJobTypes, selectedJobType],
        };
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        companyId: 1,
        experienceLevelId: 1,
        jobTypeId: formData.jobType.length > 0 ? formData.jobType : [],
        salaryRangeId: parseInt(formData.salary) || 1,
        logo: "https://company.png",
      };

      const response = await fetch("http://localhost:3000/jobs/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job offer created successfully:", result);

        setFormData({
          title: "",
          location: "",
          jobType: [],
          salary: "",
          description: "",
        });

        alert("Job offer published successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to create job offer:", errorData);
        alert(
          `Failed to publish job offer: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while publishing the job offer. Please try again."
      );
    }
  };

  return (
    <div className={styles.jobApplicationContainer}>
      <div className={styles.jobApplicationHeader}>
        <h1>Create New Job Offer!</h1>
      </div>
      <div className={styles.jobApplicationForm}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className={styles.inputField}
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />

          <div className={styles.jobtypes}>
            {jobTypes.map((jobType, index) => (
              <label
                htmlFor={`jobType-${index}`}
                key={jobType.value || index}
                className={`${styles.tag} ${
                  jobType.label === "Full Time"
                    ? styles.fullTime
                    : jobType.label === "Part Time"
                    ? styles.partTime
                    : jobType.label === "Senior"
                    ? styles.senior
                    : jobType.label === "Entry Level"
                    ? styles.entryLevel
                    : jobType.label === "Mid Level"
                    ? styles.midLevel
                    : jobType.label === "Freelance"
                    ? styles.freelance
                    : jobType.label === "Internship"
                    ? styles.internship
                    : jobType.label === "Contract"
                    ? styles.contract
                    : jobType.label === "Lead"
                    ? styles.lead
                    : jobType.label === "Volunteering"
                    ? styles.volunteering
                    : jobType.label === "Executive"
                    ? styles.executive
                    : ""
                }`}
              >
                {jobType.label}
                <input
                  id={`jobType-${index}`}
                  type="checkbox"
                  name="jobType"
                  value={jobType.value}
                  onChange={() => handleJobTypeChange(jobType.value)}
                />
              </label>
            ))}
          </div>

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className={styles.inputField}
            value={formData.salary}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className={styles.inputField}
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            required
          />

          <button type="submit" className={styles.saveButton}>
            Publish New Job Offer
          </button>
        </form>
      </div>
    </div>
  );
}
