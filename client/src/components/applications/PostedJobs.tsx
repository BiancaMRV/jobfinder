import { FC, useEffect, useState } from "react";
import styles from "./PostedJobs.module.css";
import { Trash2, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface JobOffer {
  id: string;
  title: string;
  logo?: string;
  description: string;
  location: string;
  salary?: string;
  experienceLevelId?: number;
  jobTypeId?: number;
  applicants_count?: number;
  created_at: string;
  company_name?: string;
  company_logo?: string;
}

export const PostedJobs: FC = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        console.log("getting joboffers...");

        // Obter o ID do usuário atual (assumindo que o usuário logado é uma empresa)
        const companyId = localStorage.getItem("companyId");
        console.log("Company ID from localStorage:", companyId);

        if (!companyId) {
          console.error("Company ID not found in localStorage");
          setError("ID da empresa não encontrado");
          setLoading(false);
          return;
        }

        // Fazer a requisição usando o ID do usuário como ID da empresa
        const response = await fetch(
          `http://localhost:3000/jobs/company/${companyId}`,
          {
            credentials: "include", // Para enviar cookies/autenticação
          }
        );

        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error("Failed to fetch job offers");
        }

        const data = await response.json();
        console.log("Job offers received:", data);
        setJobOffers(data);
      } catch (error) {
        console.error("Error fetching job offers:", error);
        setError("Erro ao buscar ofertas de trabalho");
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this job offer?") === true
    ) {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          // Remover a oferta excluída do estado
          setJobOffers((prev) => prev.filter((job) => job.id !== id));
        } else {
          throw new Error("Failed to delete job offer");
        }
      } catch (error) {
        console.error("Error deleting job offer:", error);
        alert(
          "Falha ao excluir a oferta de emprego. Por favor, tente novamente."
        );
      }
    }
  };

  return (
    <div className={styles.postedJobsContainer}>
      <div className={styles.headerContainer}>
        <h3 className={styles.sectionTitle}>Your Posted Job Offers</h3>
        <Link to="/jobapplication" className={styles.publishButton}>
          <Plus size={16} />
          Publish Job Offer
        </Link>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          Carregando ofertas de emprego...
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : jobOffers.length === 0 ? (
        <div className={styles.noJobs}>
          <p>You haven't posted any job offers yet.</p>
          <p>
            Click the "Publish Job Offer" button to create your first job
            listing!
          </p>
        </div>
      ) : (
        <div className={styles.jobsList}>
          {jobOffers.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <h4 className={styles.jobTitle}>{job.title}</h4>
                <div className={styles.jobActions}>
                  <Link
                    to={`/edit-job-offer/${job.id}`}
                    className={styles.actionButton}
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.jobDetails}>
                <p className={styles.jobLocation}>{job.location}</p>
                <p className={styles.jobDate}>
                  Posted on: {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
