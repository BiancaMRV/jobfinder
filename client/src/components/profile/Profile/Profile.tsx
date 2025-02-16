import styles from "./Profile.module.css";
import { CircleUser, MapPin, Mail, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
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

  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profilecard}>
        <div className={styles.profileheader}>
          <CircleUser
            className={styles.circleuser}
            color="#9158d6"
            size={100}
          />
          <h2> jose silva</h2>
          <div className={styles.profileinfo}>
            <div className={styles.location}>
              <MapPin size={20} />
              <span>location </span>
            </div>
            <div className={styles.email}>
              <Mail size={20} />
              <span> email </span>
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
    </div>
  );
}

//TODO: upload de foto no circulo users
