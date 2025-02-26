import styles from "./Overview.module.css";
import {
  Briefcase,
  Pencil,
  GraduationCap,
  Save,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

export default function Overview() {
  //EXPERIENCE
  const [editingExperience, setEditingExperience] = useState(false);
  const [experienceData, setExperienceData] = useState({
    title: "Frontend Developer",
    dateCompany: "TechCorp • 2022 - Present",
    description:
      "Developing responsive web applications using React and TypeScript.",
  });

  const [tempExperienceData, setTempExperienceData] = useState({
    ...experienceData, // estado temporario para armazenar os dados
  });
  const handleEditExperience = () => {
    setTempExperienceData({ ...experienceData });
    setEditingExperience(true);
  };
  const handleSaveExperience = () => {
    setExperienceData({ ...tempExperienceData });
    setEditingExperience(false);
  };

  const [editingEducation, setEditingEducation] = useState(false);
  //EDUCATION
  const [educationData, setEducationData] = useState({
    courseName: "Computer Science",
    institution: "University of Minho • 2018 - 2022",
    description: "Specialized in software engineering.",
  });

  const [tempEducationData, setTempEducationData] = useState({
    ...educationData,
  });

  const handleEditEducation = () => {
    setTempEducationData({ ...educationData });
    setEditingEducation(true);
  };

  const handleSaveEducation = () => {
    setEducationData({ ...tempEducationData });
    setEditingEducation(false);
  };
  // SKILLS
  const [editingSkills, setEditingSkills] = useState(false);

  const [skillsData, setSkillsData] = useState({
    title: "React",
    YearsofExperience: "2",
    Description: "Frontend Development",
  });
  const [tempSkillsData, setTempSkillsData] = useState({
    ...skillsData,
  });
  const handleEditSkills = () => {
    setTempSkillsData({ ...skillsData });
    setEditingSkills(true);
  };
  const handleSaveSkills = () => {
    setSkillsData({ ...tempSkillsData });
    setEditingSkills(false);
  };

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Briefcase size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Experience</span>
          {!editingExperience ? (
            <Pencil
              size={24}
              className={styles.editIcon}
              onClick={handleEditExperience}
            />
          ) : (
            <Save
              size={24}
              className={styles.saveIcon}
              onClick={handleSaveExperience}
            />
          )}
        </div>

        {editingExperience ? (
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Title"
              className={styles.inputField}
              value={tempExperienceData.title}
              onChange={(e) =>
                setTempExperienceData({
                  ...tempExperienceData,
                  title: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Date and Name of Company"
              className={styles.inputField}
              value={tempExperienceData.dateCompany}
              onChange={(e) =>
                setTempExperienceData({
                  ...tempExperienceData,
                  dateCompany: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Description"
              className={styles.inputField}
              value={tempExperienceData.description}
              onChange={(e) =>
                setTempExperienceData({
                  ...tempExperienceData,
                  description: e.target.value,
                })
              }
              required
            />

            <button
              className={styles.saveButton}
              onClick={handleSaveExperience}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className={styles.displayContent}>
            <h3 className={styles.contentTitle}>{experienceData.title}</h3>
            <p className={styles.contentSubtitle}>
              {experienceData.dateCompany}
            </p>
            <p className={styles.contentDescription}>
              {experienceData.description}
            </p>
          </div>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <GraduationCap size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Education</span>
          {!editingEducation ? (
            <Pencil
              size={24}
              className={styles.editIcon}
              onClick={handleEditEducation}
            />
          ) : (
            <Save
              size={24}
              className={styles.saveIcon}
              onClick={handleSaveEducation}
            />
          )}
        </div>

        {editingEducation ? (
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="CourseName"
              className={styles.inputField}
              value={tempEducationData.courseName}
              onChange={(e) =>
                setTempEducationData({
                  ...tempEducationData,
                  courseName: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Institution And Date"
              className={styles.inputField}
              value={tempEducationData.institution}
              onChange={(e) =>
                setTempEducationData({
                  ...tempEducationData,
                  institution: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Description"
              className={styles.inputField}
              value={tempEducationData.description}
              onChange={(e) =>
                setTempEducationData({
                  ...tempEducationData,
                  description: e.target.value,
                })
              }
            />

            <button className={styles.saveButton} onClick={handleSaveEducation}>
              Save Changes
            </button>
          </div>
        ) : (
          <div className={styles.displayContent}>
            <h3 className={styles.contentTitle}>{educationData.courseName}</h3>
            <p className={styles.contentSubtitle}>
              {educationData.institution}
            </p>
            {educationData.description && (
              <p className={styles.contentDescription}>
                {educationData.description}
              </p>
            )}
          </div>
        )}
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Lightbulb size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Skills</span>
          {!editingSkills ? (
            <Pencil
              size={24}
              className={styles.editIcon}
              onClick={handleEditSkills}
            />
          ) : (
            <Save
              size={24}
              className={styles.saveIcon}
              onClick={handleSaveSkills}
            />
          )}
        </div>
        {editingSkills ? (
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Title"
              className={styles.inputField}
              value={tempSkillsData.title}
              onChange={(e) =>
                setTempSkillsData({ ...tempSkillsData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Years of Experience"
              className={styles.inputField}
              value={tempSkillsData.YearsofExperience}
              onChange={(e) =>
                setTempSkillsData({
                  ...tempSkillsData,
                  YearsofExperience: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              className={styles.inputField}
              value={tempSkillsData.Description}
              onChange={(e) =>
                setTempSkillsData({
                  ...tempSkillsData,
                  Description: e.target.value,
                })
              }
              required
            />

            <button className={styles.saveButton} onClick={handleSaveSkills}>
              Save Changes
            </button>
          </div>
        ) : (
          <div className={styles.displayContent}>
            <h3 className={styles.contentTitle}>{skillsData.title}</h3>
            <p className={styles.contentSubtitle}>
              {skillsData.YearsofExperience} years of experience
            </p>
            <p className={styles.contentDescription}>
              {skillsData.Description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
