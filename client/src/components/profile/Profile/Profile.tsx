import styles from "./Profile.module.css";
import { CircleUser, MapPin, Mail, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Documents from "./Documents";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import { ProfileProvider } from "./profilecontext";

interface ApplicationStatus {
  total_applications: number;
  total_interviews: number;
  total_offers: number;
}

interface ProfileProps {
  isCompanyView?: boolean;
}
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
}

export function Profile({ isCompanyView = false }: ProfileProps) {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          firstName: data.firstname || "",
          lastName: data.lastname || "",
          email: data.email || "",
          location: data.location || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();
  }, []);
  const fullName = `${userData.firstName} ${userData.lastName}`.trim();
  console.log("Full Name:", fullName);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [profileImage]);

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

  return (
    <ProfileProvider isCompanyView={isCompanyView}>
      <div className={styles.profilecontainer}>
        <div className={styles.profilecard}>
          <div className={styles.profileheader}>
            {/* Conditionally render the upload functionality based on view type */}
            {isCompanyView ? (
              <div className={styles.profileimage}>
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
              </div>
            ) : (
              <>
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
              </>
            )}
            <h2> {fullName || "Utilizador"} </h2>
            <div className={styles.profileinfo}>
              <div className={styles.location}>
                <MapPin size={20} />
                <span>{userData.location || "Local não especificado"} </span>
              </div>
              <div className={styles.email}>
                <Mail size={20} />
                <span>{userData.email || "Email não especificado"} </span>
              </div>
            </div>

            {/* Only show the edit button if it's not company view */}
            {!isCompanyView && (
              <button
                className={styles.buttonprofile}
                onClick={() => console.log("Edit profile")}
              >
                <Edit2 size={20} />
                <span> Edit Profile </span>
              </button>
            )}
          </div>

          {/* Only show application stats if it's not company view */}
          {!isCompanyView && (
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
          )}
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
            {activeTab === "skills" && <Skills />}
            {activeTab === "documents" && <Documents />}
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
