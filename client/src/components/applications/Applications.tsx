import { Briefcase } from "lucide-react";
import styles from "./Applications.module.css";
import { useEffect, useState } from "react";
import UserCandidate from "./UserCandidate";

export default function Applications() {
  const [jobOffer, setJobOffer] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobOffer = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/jobs/company", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Falha ao obter dados de ofertas de emprego");
        }
        const data = await response.json();
        setJobOffer(data);
      } catch (error) {
        console.error("Erro ao obter dados de ofertas de emprego:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobOffer();
  }, []);

  useEffect(() => {
    const fetchCandidates = async (jobOfferId: number) => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobs/${jobOfferId}/candidates`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Falha ao obter dados dos candidatos");
        }
        const data = await response.json();

        setCandidates((prev) => {
          const exists = prev.some((c) => c.jobOfferId === jobOfferId);
          if (exists) {
            return prev.map((c) =>
              c.jobOfferId === jobOfferId ? { ...c, candidates: data } : c
            );
          } else {
            return [...prev, { jobOfferId, candidates: data }];
          }
        });
      } catch (error) {
        console.error("Erro ao obter dados dos candidatos:", error);
      }
    };

    jobOffer.forEach((job) => {
      if (!candidates.some((c) => c.jobOfferId === job.id)) {
        fetchCandidates(job.id);
      }
    });
  }, [jobOffer]);

  const toggleJobExpand = (jobId: number) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getCandidatesForJob = (jobId: number) => {
    const jobCandidates = candidates.find(
      (candidate) => candidate.jobOfferId === jobId
    );
    return jobCandidates ? jobCandidates.candidates : [];
  };

  return (
    <div className={styles.applicationcontainer}>
      <div className={styles.headerapplication}>
        <h1>Candidaturas por Oferta de Emprego</h1>
      </div>

      {loading ? (
        <div className={styles.loadingmessage}>
          <h5>A carregar ofertas de emprego...</h5>
        </div>
      ) : jobOffer.length > 0 ? (
        jobOffer.map((job) => (
          <div key={`job-${job.id}`} className={styles.joboffercontainer}>
            <div
              className={styles.jobheader}
              onClick={() => toggleJobExpand(job.id)}
            >
              <Briefcase size={24} className={styles.sectionIcon} />
              <h3>{job.title}</h3>
              <div className={styles.informationjoboffer}>
                <h5>{job.location}</h5>
                <h5>{new Date(job.created_at).toLocaleDateString()}</h5>
              </div>
            </div>

            {expandedJobs.includes(job.id) && (
              <div className={styles.candidateslist}>
                {getCandidatesForJob(job.id).length > 0 ? (
                  getCandidatesForJob(job.id).map(
                    (candidate: any, index: number) => (
                      <UserCandidate
                        key={`candidate-${job.id}-${candidate.id || index}`}
                        candidate={candidate}
                      />
                    )
                  )
                ) : (
                  <div className={styles.nocandidatesmessage}>
                    <h5>
                      Ainda não existem candidaturas para esta oferta de emprego
                    </h5>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className={styles.nocandidatesmessage}>
          <h5>Não foram encontradas ofertas de emprego</h5>
        </div>
      )}
    </div>
  );
}
