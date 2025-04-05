import styles from "./JobApplication.module.css";
import { jobTypesAndExerienceLevels } from "../jobs/JobCard/JobCards";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { CircleArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function JobApplication() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: [] as string[],
    experienceLevels: [] as string[],
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const experienceLevels = Array.from(
      form.querySelectorAll('input[name="experienceLevels"]:checked')
    ).map((checkbox) => (checkbox as HTMLInputElement).value);

    const jobTypes = Array.from(
      form.querySelectorAll('input[name="jobTypes"]:checked')
    ).map((checkbox) => (checkbox as HTMLInputElement).value);

    try {
      const data = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        experienceLevelId: experienceLevels.length > 0 ? experienceLevels : [],
        jobTypeId: jobTypes.length > 0 ? jobTypes : [],
        salary: parseInt(formData.salary) || 1,
        logo: "https://company.png",
      };

      console.log("Dados da vaga a serem enviados:", data);

      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Job offer created successfully!");
        console.log("Job offer created successfully:", result);

        setFormData({
          title: "",
          location: "",
          jobType: [],
          experienceLevels: [],
          salary: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to create job offer:", errorData);
        alert(
          `Failed to publish job offer: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast(
        "An error occurred while publishing the job offer. Please try again."
      );
    }
  };

  return (
    <div className={styles.jobApplicationContainer}>
      <div className={styles.jobApplicationHeader}>
        <CircleArrowLeft
          className={styles.circlearrowleft}
          color="#9158d6"
          size={30}
          onClick={() => window.history.back()}
        />
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
            <h1>Job Type</h1>

            <div className={styles.tagsList}>
              {jobTypesAndExerienceLevels
                .filter((type) => type.type === "jobType")
                .map((jobType, index) => (
                  <div
                    className={`${styles.tagContainer} ${
                      jobType.label === "Full Time"
                        ? styles.fullTime
                        : jobType.label === "Part Time"
                        ? styles.partTime
                        : jobType.label === "Contract"
                        ? styles.contract
                        : jobType.label === "Freelance"
                        ? styles.freelance
                        : jobType.label === "Internship"
                        ? styles.internship
                        : jobType.label === "Volunteering"
                        ? styles.volunteering
                        : ""
                    }`}
                    key={jobType.value || index}
                  >
                    <input
                      id={`jobType-${index}`}
                      type="checkbox"
                      name="jobTypes"
                      value={jobType.value}
                    />
                    <label
                      htmlFor={`jobType-${index}`}
                      className={`${styles.tag}`}
                    >
                      {jobType.label}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.experienceLevels}>
            <h1>Experience Level</h1>
            <div className={styles.tagsList}>
              {jobTypesAndExerienceLevels
                .filter((type) => type.type === "experienceLevel")
                .map((experienceLevel, index) => (
                  <div
                    key={experienceLevel.value || index}
                    className={`${styles.tagContainer} ${
                      experienceLevel.label === "Entry Level"
                        ? styles.entryLevel
                        : experienceLevel.label === "Mid Level"
                        ? styles.midLevel
                        : experienceLevel.label === "Senior"
                        ? styles.senior
                        : experienceLevel.label === "Lead"
                        ? styles.lead
                        : experienceLevel.label === "Executive"
                        ? styles.executive
                        : ""
                    }`}
                  >
                    <input
                      id={`experienceLevel-${index}`}
                      type="checkbox"
                      name="experienceLevels"
                      value={experienceLevel.value}
                    />
                    <label htmlFor={`experienceLevel-${index}`}>
                      {experienceLevel.label}
                    </label>
                  </div>
                ))}
            </div>
          </div>

          <input
            type="number"
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
