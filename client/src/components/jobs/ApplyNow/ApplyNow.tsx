import { useState, useEffect, FormEvent } from "react";
import styles from "./ApplyNow.module.css";
import { CircleUser, Paperclip, FileText, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../utils/const";
//TODO:REVER
interface DocumentType {
  id: string;
  name: string;
  url: string;
  type: string;
  content?: string;
}

export default function ApplyNow() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  let jobOfferId = useParams().jobOfferId;
  const [companyId, setCompanyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const response = await fetch(BACKEND_URL + `/jobs/${jobOfferId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company ID");
        }

        const data = await response.json();
        console.log(data);
        setCompanyId(data.company_id);
        setJobTitle(data.title);
      } catch (error) {
        console.error("Error fetching company ID:", error);
      }
    };

    fetchCompanyId();
  }, []);

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await fetch(BACKEND_URL + `/companies/${companyId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company name");
        }

        const data = await response.json();
        setCompanyName(data.name);
      } catch (error) {
        console.error("Error fetching company name:", error);
      }
    };

    fetchCompanyName();
  }, [companyId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(BACKEND_URL + "/users", {
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
        setError("Failed to load user profile. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    try {
      const savedDocuments = localStorage.getItem("userDocuments");
      if (savedDocuments) {
        const parsedDocs = JSON.parse(savedDocuments);

        // Processar os documentos para reconstruir URLs se necessário
        const processedDocs = parsedDocs.map((doc: DocumentType) => {
          // Se temos o conteúdo, podemos recriar a URL
          if (doc.content) {
            try {
              // Recria o Blob e URL a partir do conteúdo base64
              const byteCharacters = atob(doc.content);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);
              const url = URL.createObjectURL(blob);

              return { ...doc, url };
            } catch (e) {
              console.error("Erro ao reconstruir documento:", e);
              return doc;
            }
          }
          return doc;
        });

        setDocuments(processedDocs);
      } else {
        // Se não houver documentos, definir como array vazio
        setDocuments([]);
      }
    } catch (error) {
      console.error("Error loading documents from localStorage:", error);
      setError("Failed to load your documents. Please try again.");
    }
  }, []);

  // Fetch profile image
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleDocumentSelection = (docId: string) => {
    setSelectedDocuments((prev) => {
      if (prev.includes(docId)) {
        return prev.filter((id) => id !== docId);
      } else {
        return [...prev, docId];
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate form
    if (selectedDocuments.length === 0) {
      setError(
        "Please select at least one document to include in your application"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const fullName = `${userData.firstName} ${userData.lastName}`.trim();

      const applicationData = {
        cover_letter: coverLetter,
        resume: selectedDocuments.join(","), // Join the IDs of selected documents
        job_offer_id: jobOfferId,
        company_id: companyId,
      };

      const response = await fetch(BACKEND_URL + "/applications/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <h2>Application Submitted Successfully!</h2>
          <p>
            Your application for <strong>{jobTitle}</strong> at{" "}
            <strong>{companyName}</strong> has been sent.
          </p>
          <p>You will be notified of any updates to your application status.</p>
          <button
            className={styles.homeButton}
            onClick={() => (window.location.href = "/homepage")}
          >
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.applyNowContainer}>
      <div className={styles.applyNowHeader}>
        <h1>Quick Application</h1>
        <h2>
          Apply for: {jobTitle} at {companyName}
        </h2>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.applyNowForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileSection}>
            <div className={styles.profileImageContainer}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
              ) : (
                <CircleUser
                  className={styles.circleUser}
                  color="#9158d6"
                  size={80}
                />
              )}
            </div>
            <div className={styles.profileDetails}>
              <h3>{`${userData.firstName} ${userData.lastName}`}</h3>
              <p>{userData.email}</p>
              <p>{userData.location}</p>
            </div>
          </div>

          <div className={styles.documentsSection}>
            <h3>My Documents</h3>
            <p className={styles.documentsNote}>
              Select the documents to include with your application:
            </p>

            {documents.length === 0 ? (
              <p className={styles.noDocuments}>
                No documents found. Please upload documents in your profile.
              </p>
            ) : (
              <div className={styles.documentsList}>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`${styles.documentItem} ${
                      selectedDocuments.includes(doc.id) ? styles.selected : ""
                    }`}
                    onClick={() => handleDocumentSelection(doc.id)}
                  >
                    <div className={styles.documentIcon}>
                      {doc.type.includes("PDF") ? (
                        <FileText size={24} />
                      ) : (
                        <Paperclip size={24} />
                      )}
                    </div>
                    <div className={styles.documentInfo}>
                      <p className={styles.documentName}>{doc.name}</p>
                      <p className={styles.documentType}>{doc.type}</p>
                    </div>
                    <div className={styles.documentCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => {}} // Handled by the div click
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.coverLetterSection}>
            <h3>Cover Letter (Optional)</h3>
            <textarea
              className={styles.coverLetterInput}
              placeholder="Add a personalized message to the employer..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
            />
          </div>

          <div className={styles.submitSection}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || documents.length === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
