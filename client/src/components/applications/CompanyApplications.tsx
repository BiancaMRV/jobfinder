import { useState, useEffect } from "react";
import styles from "./CompanyApplications.module.css";
import {
  User,
  FileText,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Application {
  id: string;
  name: string;
  cover_letter: string;
  resume: string;
  status: string;
  created_at: string;
  job_offer_id: string;
}

interface JobOffer {
  id: string;
  title: string;
  applications_count: number;
}

export default function CompanyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicantProfile, setApplicantProfile] = useState<any>(null);
  const [resumeFiles, setResumeFiles] = useState<{ [key: string]: any }>({});

  // Buscar ofertas de emprego da empresa
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs/company", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job offers");
        }

        const data = await response.json();
        setJobOffers(data);

        // Selecionar o primeiro emprego por padrão
        if (data.length > 0 && !selectedJobId) {
          setSelectedJobId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching job offers:", error);
        setError("Failed to load job postings");
      }
    };

    fetchJobOffers();
  }, []);

  // Buscar candidaturas para a oferta de emprego selecionada
  useEffect(() => {
    if (!selectedJobId) return;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/applications/job/${selectedJobId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
        setSelectedApplication(null); // Reset selection when changing jobs
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [selectedJobId]);

  // Ver detalhes de uma candidatura específica
  const viewApplication = async (application: Application) => {
    setSelectedApplication(application);

    // Buscar perfil do candidato
    try {
      const response = await fetch(
        `http://localhost:3000/users/${application.id}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const profileData = await response.json();
        setApplicantProfile(profileData);
      }
    } catch (error) {
      console.error("Error fetching applicant profile:", error);
    }

    // Buscar documentos do candidato (resumos/CVs)
    if (application.resume) {
      const documentIds = application.resume.split(",");

      // Agora, vamos trabalhar com localStorage por enquanto
      try {
        const savedDocuments = localStorage.getItem("userDocuments");
        if (savedDocuments) {
          const allDocuments = JSON.parse(savedDocuments);
          const relevantDocs = allDocuments.filter((doc: any) =>
            documentIds.includes(doc.id)
          );

          const docsMap: { [key: string]: any } = {};
          relevantDocs.forEach((doc: any) => {
            docsMap[doc.id] = doc;
          });

          setResumeFiles(docsMap);
        }
      } catch (error) {
        console.error("Error loading resume files:", error);
      }
    }
  };

  // Atualizar status da candidatura
  const updateApplicationStatus = async (
    applicationId: string,
    newStatus: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/application/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          applicationId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Atualizar o estado local
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );

        if (selectedApplication && selectedApplication.id === applicationId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      setError("Failed to update application status");
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Recuperar etiqueta de status apropriada
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return styles.pendingBadge;
      case "reviewing":
        return styles.reviewingBadge;
      case "interview":
        return styles.interviewBadge;
      case "accepted":
        return styles.acceptedBadge;
      case "rejected":
        return styles.rejectedBadge;
      default:
        return styles.pendingBadge;
    }
  };

  // Visualizar documento (abrir em nova aba)
  const viewDocument = (documentId: string) => {
    const doc = resumeFiles[documentId];
    if (doc && doc.content) {
      // Criar um blob e abrir em nova aba
      try {
        const byteCharacters = atob(doc.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let mimeType = "application/octet-stream";
        if (doc.type.includes("PDF")) mimeType = "application/pdf";

        const blob = new Blob([byteArray], { type: mimeType });
        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");
      } catch (error) {
        console.error("Error viewing document:", error);
        alert("Failed to open document. Please try again.");
      }
    }
  };

  return (
    <div className={styles.applicationsContainer}>
      <h1 className={styles.pageTitle}>Candidaturas Recebidas</h1>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.contentLayout}>
        <div className={styles.sidebar}>
          <h3>Minhas Vagas</h3>
          <div className={styles.jobList}>
            {jobOffers.map((job) => (
              <div
                key={job.id}
                className={`${styles.jobItem} ${
                  selectedJobId === job.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedJobId(job.id)}
              >
                <div className={styles.jobTitle}>{job.title}</div>
                <div className={styles.jobAppCount}>
                  {job.applications_count} candidaturas
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mainContent}>
          {loading ? (
            <div className={styles.loadingMessage}>
              Carregando candidaturas...
            </div>
          ) : applications.length === 0 ? (
            <div className={styles.emptyMessage}>
              Nenhuma candidatura recebida para esta vaga.
            </div>
          ) : (
            <div className={styles.applicationsList}>
              <div className={styles.listHeader}>
                <div className={styles.headerItem}>Candidato</div>
                <div className={styles.headerItem}>Data</div>
                <div className={styles.headerItem}>Status</div>
                <div className={styles.headerItem}>Ação</div>
              </div>

              {applications.map((application) => (
                <div
                  key={application.id}
                  className={`${styles.applicationItem} ${
                    selectedApplication?.id === application.id
                      ? styles.selectedItem
                      : ""
                  }`}
                >
                  <div className={styles.candidateName}>
                    <User size={18} />
                    {application.name}
                  </div>
                  <div className={styles.applicationDate}>
                    <Calendar size={18} />
                    {formatDate(application.created_at)}
                  </div>
                  <div className={styles.applicationStatus}>
                    <span
                      className={`${styles.statusBadge} ${getStatusBadgeClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <div className={styles.applicationActions}>
                    <button
                      className={styles.viewButton}
                      onClick={() => viewApplication(application)}
                    >
                      <Eye size={18} />
                      See Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedApplication && (
            <div className={styles.applicationDetails}>
              <h2>Details</h2>

              <div className={styles.applicantInfo}>
                <div className={styles.applicantHeader}>
                  <User size={24} color="#9158d6" />
                  <h3>{selectedApplication.name}</h3>
                </div>

                {applicantProfile && (
                  <div className={styles.contactInfo}>
                    <div className={styles.infoItem}>
                      <Mail size={16} />
                      <span>{applicantProfile.email}</span>
                    </div>
                    {applicantProfile.location && (
                      <div className={styles.infoItem}>
                        <MapPin size={16} />
                        <span>{applicantProfile.location}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.applicationMeta}>
                  <div className={styles.metaItem}>
                    <Calendar size={16} />
                    <span>
                      Candidatura enviada em{" "}
                      {formatDate(selectedApplication.created_at)}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={16} />
                    <span>
                      Status atual:{" "}
                      <span
                        className={getStatusBadgeClass(
                          selectedApplication.status
                        )}
                      >
                        {selectedApplication.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.applicationDocuments}>
                <h3>Documentos</h3>
                {selectedApplication.resume ? (
                  <div className={styles.documentsList}>
                    {selectedApplication.resume.split(",").map((docId) => (
                      <div key={docId} className={styles.documentItem}>
                        <FileText size={20} color="#9158d6" />
                        <span className={styles.documentName}>
                          {resumeFiles[docId]?.name || `Documento ${docId}`}
                        </span>
                        <button
                          className={styles.viewDocButton}
                          onClick={() => viewDocument(docId)}
                        >
                          <Eye size={16} />
                          Visualizar
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nenhum documento anexado</p>
                )}
              </div>

              {selectedApplication.cover_letter && (
                <div className={styles.coverLetter}>
                  <h3>Carta de Apresentação</h3>
                  <div className={styles.coverLetterContent}>
                    {selectedApplication.cover_letter}
                  </div>
                </div>
              )}

              <div className={styles.statusActions}>
                <h3>Atualizar Status</h3>
                <div className={styles.actionButtons}>
                  <button
                    className={`${styles.statusButton} ${styles.reviewButton}`}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Reviewing"
                      )
                    }
                  >
                    <Eye size={16} />
                    Em Análise
                  </button>
                  <button
                    className={`${styles.statusButton} ${styles.interviewButton}`}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Interview"
                      )
                    }
                  >
                    <User size={16} />
                    Convidar para Entrevista
                  </button>
                  <button
                    className={`${styles.statusButton} ${styles.acceptButton}`}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Accepted"
                      )
                    }
                  >
                    <CheckCircle size={16} />
                    Aceitar
                  </button>
                  <button
                    className={`${styles.statusButton} ${styles.rejectButton}`}
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Rejected"
                      )
                    }
                  >
                    <XCircle size={16} />
                    Rejeitar
                  </button>
                </div>
              </div>

              <div className={styles.applicantProfileAction}>
                <Link
                  to={`/view-profile/${selectedApplication.id}`}
                  className={styles.viewProfileLink}
                >
                  Ver perfil completo do candidato
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
