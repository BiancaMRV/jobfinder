import styles from "./Profile.module.css";
import {
  CircleUser,
  MapPin,
  Mail,
  Edit2,
  X,
  Save,
  CircleArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Documents from "./Documents";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import { ProfileProvider } from "./profilecontext";
import toast from "react-hot-toast";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    // Primeiro tenta carregar do localStorage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      setEditData(parsedData);
      return;
    }

    // Se não encontrar no localStorage, tenta buscar da API
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
        const formattedData = {
          firstName: data.firstname || "",
          lastName: data.lastname || "",
          email: data.email || "",
          location: data.location || "",
        };

        setUserData(formattedData);
        setEditData(formattedData);
        // Salva no localStorage para uso futuro
        localStorage.setItem("userData", JSON.stringify(formattedData));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();
  }, []);

  const fullName = `${userData.firstName} ${userData.lastName}`.trim();

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
        toast("A imagem é muito grande! Escolha uma de até 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Salvar os dados editados no localStorage
    const updatedUserData = { ...editData };
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ProfileProvider isCompanyView={isCompanyView}>
      <div className={styles.profilecontainer}>
        <div className={styles.profilecard}>
          <div className={styles.buttonarrow}>
            <CircleArrowLeft
              className={styles.circlearrowleft}
              color="#9158d6"
              size={30}
              onClick={() => window.history.back()}
            />
          </div>
          <div className={styles.profileheader}>
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

            {!isEditing ? (
              <>
                <h2>{fullName || "Utilizador"}</h2>
                <div className={styles.profileinfo}>
                  <div className={styles.location}>
                    <MapPin size={20} />
                    <span>{userData.location || "Local não especificado"}</span>
                  </div>
                  <div className={styles.email}>
                    <Mail size={20} />
                    <span>{userData.email || "Email não especificado"}</span>
                  </div>
                </div>

                {!isCompanyView && (
                  <button
                    className={styles.buttonprofile}
                    onClick={handleEditClick}
                  >
                    <Edit2 size={20} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </>
            ) : (
              <div className={styles.editFormContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Primeiro Nome</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Sobrenome</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location">Localização</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={editData.location}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button className={styles.saveButton} onClick={handleSave}>
                    <Save size={20} />
                    <span>Salvar</span>
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    <X size={20} />
                    <span>Cancelar</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Apenas mostra as estatísticas se não for company view */}
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
