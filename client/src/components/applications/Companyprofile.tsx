// Atualização do componente CompanyProfile.tsx
import { useEffect, useState } from "react";
import styles from "./Companyprofile.module.css";
import { CircleUser, MapPin, Mail, Edit2, Plus } from "lucide-react";
import OverviewCompany from "./OverviewCompany";
import CompanyInfo from "./CompanyInfo";
import PostedJobs from "./PostedJobs";
import Applications from "./Applications";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/const";

interface JobOfferStatus {
  total_activejobs: number;
  total_application: number;
  total_interviews: number;
}

interface CompanyData {
  name: string;
  location: string;
  email: string;
}

export default function CompanyProfile() {
  const [jobOfferstatus, setJobOfferstatus] = useState<JobOfferStatus>({
    total_activejobs: 0,
    total_application: 0,
    total_interviews: 0,
  });

  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    location: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(BACKEND_URL + "/users", {
          method: "GET",
          credentials: "include",
        });

        console.log("Raw company response:", response);

        if (!response.ok) {
          console.error("Error status:", response.status);
          const errorText = await response.text();
          console.error("Error response:", errorText);
          setError(`Failed to fetch company data: ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log("Company data received:", data);

        // Store both user ID and company ID
        localStorage.setItem("userId", data.id.toString());
        localStorage.setItem("companyId", data.id.toString());

        setCompanyData({
          name: data.name || "",
          location: data.location || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Error fetching company:", error);
        setError("Error connecting to server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchJobOfferStatus = async () => {
      try {
        // Get the company ID (which should be set by now)
        const companyId =
          localStorage.getItem("companyId") || localStorage.getItem("userId");

        if (!companyId) {
          console.error("No company ID found for job stats");
          return;
        }

        const response = await fetch(BACKEND_URL + "/jobs/company-stats", {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error("Failed to fetch job offer status");
        }

        const data = await response.json();
        console.log("Job stats received:", data);
        setJobOfferstatus(data);
      } catch (error) {
        console.error("Error fetching job stats:", error);
      }
    };

    // Uncomment and call the function to fetch job stats
    fetchJobOfferStatus();
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
        toast("Image is too large! Please choose one up to 2MB.");
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
              <div className={styles.imageContainer}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <div className={styles.addIconOverlay}>
                  <Plus color="#ffffff" size={24} />
                </div>
              </div>
            ) : (
              <div className={styles.imageContainer}>
                <CircleUser
                  className={styles.circleuser}
                  color="#9158d6"
                  size={100}
                />
                <div className={styles.addIconOverlay}>
                  <Plus color="#ffffff" size={24} />
                </div>
              </div>
            )}
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileinput}
          />
          <h2>{isLoading ? "Loading..." : companyData.name || "User"}</h2>
          <div className={styles.profileinfo}>
            <div className={styles.location}>
              <MapPin size={20} />
              <span>
                {isLoading
                  ? "Loading location..."
                  : companyData.location || "Location not specified"}
              </span>
            </div>
            <div className={styles.email}>
              <Mail size={20} />
              <span>
                {isLoading
                  ? "Loading email..."
                  : companyData.email || "Email not specified"}
              </span>
            </div>
          </div>
          <button
            className={styles.buttonprofile}
            onClick={() => console.log("Edit profile")}
          >
            <Edit2 size={20} />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {jobOfferstatus.total_activejobs}
            </span>
            <span className={styles.statLabel}>Active Jobs</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {jobOfferstatus.total_application}
            </span>
            <span className={styles.statLabel}>Applications</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {jobOfferstatus.total_interviews}
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
          <span
            className={activeTab === "Candidates" ? styles.active : ""}
            onClick={() => handleTabClick("Candidates")}
          >
            Candidates
          </span>
        </div>
        <div className={styles.contentContainer}>
          {activeTab === "overview" && <OverviewCompany />}
          {activeTab === "Company Info" && <CompanyInfo />}
          {activeTab === "Posted Jobs" && <PostedJobs />}
          {activeTab === "Candidates" && <Applications />}
        </div>
      </div>
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
