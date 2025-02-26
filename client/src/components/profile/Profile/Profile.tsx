import styles from "./Profile.module.css";
import { CircleUser, MapPin, Mail, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Documents from "./Documents";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

interface ApplicationStatus {
  total_applications: number;
  total_interviews: number;
  total_offers: number;
}
export function Profile() {
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(
    {
      total_applications: 0,
      total_interviews: 0,
      total_offers: 0,
    }
  );

  useEffect(() => {
    const fetchApplicationStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/application-stats",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setApplicationStatus(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchApplicationStats();
  }, []);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profilecard}>
        <div className={styles.profileheader}>
          <CircleUser
            className={styles.circleuser}
            color="#9158d6"
            size={100}
          />
          <h2> Bianca Vilaverde</h2>
          <div className={styles.profileinfo}>
            <div className={styles.location}>
              <MapPin size={20} />
              <span>Braga,Portugal </span>
            </div>
            <div className={styles.email}>
              <Mail size={20} />
              <span> biancamargarida2014@gmail.com </span>
            </div>
          </div>
          <button
            className={styles.buttonprofile}
            onClick={() => console.log("Edit profile")}
          >
            <Edit2 size={20} />
            <span> Edit Profile </span>
          </button>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {applicationStatus.total_applications}
            </span>
            <span className={styles.statLabel}>Applications</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {applicationStatus.total_interviews}
            </span>
            <span className={styles.statLabel}>Interviews</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {applicationStatus.total_offers}
            </span>
            <span className={styles.statLabel}>Offers</span>
          </div>
        </div>
      </div>
      <div className={styles.informationcontainer}>
        <div className={styles.tabs}>
          <span
            className={activeTab === "overview" ? styles.active : ""}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </span>
          <span
            className={activeTab === "education" ? styles.active : ""}
            onClick={() => handleTabClick("education")}
          >
            Education
          </span>
          <span
            className={activeTab === "experience" ? styles.active : ""}
            onClick={() => handleTabClick("experience")}
          >
            Experience
          </span>
          <span
            className={activeTab === "skills" ? styles.active : ""}
            onClick={() => handleTabClick("skills")}
          >
            Skills
          </span>
          <span
            className={activeTab === "documents" ? styles.active : ""}
            onClick={() => handleTabClick("documents")}
          >
            Documents
          </span>
        </div>
        <div className={styles.contentContainer}>
          {activeTab === "overview" && <Overview />}
          {activeTab === "education" && <Education />}
          {activeTab === "experience" && <Experience />}
          {activeTab === "Skills" && <Skills />}
          {activeTab === "documents" && <Documents />}
        </div>
      </div>
    </div>
  );
}

//TODO: upload de foto no circulo users
