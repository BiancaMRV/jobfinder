import { Download, Check, X } from "lucide-react";
import styles from "./UserCandidate.module.css";
import { useEffect, useState } from "react";

export default function UserCandidate({ candidate }: { candidate: any }) {
  const candidateName = candidate?.candidate_firstname || "Nome do candidato";
  const candidateLastName =
    candidate?.candidate_lastname || "Sobrenome do candidato";
  const candidateFullName = candidateName + " " + candidateLastName;
  const candidateExperience = candidate?.experience || "Anos de experiência";
  const candidateDate = candidate?.created_at
    ? new Date(candidate.created_at).toLocaleDateString()
    : "Data da candidatura";
  const [status, setStatus] = useState<string | null>(null);

  const handleApprove = async () => {
    setStatus("approved");
  };

  const handleReject = async () => {
    setStatus("rejected");
  };

  const handleDownload = () => {
    console.log("A descarregar currículo de", candidateName);
  };
  console.log("candidate", candidate);

  return (
    <div className={styles.usercandidatecontainer}>
      <div className={styles.headercandidate}>
        <h5>{candidateFullName}</h5>
        <h5>{candidateExperience}</h5>
        <h5>{candidateDate}</h5>
      </div>
      <div className={styles.buttonscontainer}>
        <Download
          size={24}
          className={styles.downloadIcon}
          onClick={handleDownload}
        />
        <Check size={24} className={styles.checkIcon} onClick={handleApprove} />
        <X size={24} className={styles.crossIcon} onClick={handleReject} />
      </div>
      <div className={styles.viewdetails}>
        <button className={styles.viewdetailsbutton}>Ver Detalhes</button>
      </div>
    </div>
  );
}
