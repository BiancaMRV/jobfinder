import { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
import { CircleUser, MapPin, Mail, Edit2, Upload } from "lucide-react";
import OverviewCompany from "./OverviewCompany";

interface jobofferstatus {
  total_activejobs: number;
  total_application: number;
  total_interviews: number;
}
export default function CompanyProfile() {
  const [jobofferstatus, setjobofferstatus] = useState<jobofferstatus>({
    total_activejobs: 0,
    total_application: 0,
    total_interviews: 0,
  });

  useEffect(() => {
    const fetchjobofferstatus = async () => {
      try {
        const response = await fetch("");
        if (!response.ok) {
          throw new Error("Failed to fetch job offer status");
        }
      } catch (error) {}
    };
    fetchjobofferstatus();
  }, []);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
    const savedImage = localStorage.getItem(
      "profileImage" + localStorage.getItem("userId")
    );
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem(
        "profileImage" + localStorage.getItem("userId"),
        profileImage
      );
    }
  }, [profileImage]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert("A imagem é muito grande! Escolha uma de até 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profilecard}>
        <div className={styles.profileheader}>
          <label htmlFor="upload-photo" className={styles.profileimage}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className={styles.profileImage}
              />
            ) : (
              <CircleUser
                className={styles.circleuser}
                color="#9158d6"
                size={100}
              />
            )}
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileinput}
          />
          <h2> Uphold</h2>
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
              {jobofferstatus.total_activejobs}
            </span>
            <span className={styles.statLabel}>Active Jobs</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {jobofferstatus.total_application}
            </span>
            <span className={styles.statLabel}>Applications</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {jobofferstatus.total_interviews}
            </span>
            <span className={styles.statLabel}>Interviews</span>
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
            className={activeTab === "Company Info" ? styles.active : ""}
            onClick={() => handleTabClick("Company Info")}
          >
            Company Info
          </span>
          <span
            className={activeTab === "Posted Jobs" ? styles.active : ""}
            onClick={() => handleTabClick("Posted Jobs")}
          >
            Posted Jobs
          </span>
        </div>
        <div className={styles.contentContainer}>
          {activeTab === "overview" && <OverviewCompany />}
        </div>
      </div>
    </div>
  );
}
