import { FC } from "react";
import styles from "./CompanyInfo.module.css";
import { Building, Users, Calendar, Globe, MapPin } from "lucide-react";

const CompanyInfo: FC = () => {
  return (
    <div className={styles.companyInfoContainer}>
      <h3 className={styles.sectionTitle}>Company Information</h3>

      <div className={styles.infoCard}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <Building size={18} />
            <span>Company Name</span>
          </div>
          <div className={styles.infoValue}>Uphold</div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <Calendar size={18} />
            <span>Founded</span>
          </div>
          <div className={styles.infoValue}>2010</div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <Users size={18} />
            <span>Company Size</span>
          </div>
          <div className={styles.infoValue}>51-200 employees</div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <Globe size={18} />
            <span>Website</span>
          </div>
          <div className={styles.infoValue}>
            <a
              href="https://uphold.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              uphold.com
            </a>
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <MapPin size={18} />
            <span>Headquarters</span>
          </div>
          <div className={styles.infoValue}>Braga, Portugal</div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <h4 className={styles.infoSubtitle}>About Us</h4>
        <p className={styles.infoParagraph}>
          Uphold is a digital money platform serving over 184+ countries, with
          more than 10 million customers and $1 billion in transactions.
          Specialized in software engineering, we enable users to easily buy,
          sell, and trade between different asset classes including
          cryptocurrencies, national currencies, metals, and more.
        </p>
      </div>

      <div className={styles.infoSection}>
        <h4 className={styles.infoSubtitle}>Company Specialties</h4>
        <div className={styles.tagContainer}>
          <span className={styles.tag}>Software Engineering</span>
          <span className={styles.tag}>Blockchain</span>
          <span className={styles.tag}>Fintech</span>
          <span className={styles.tag}>Digital Assets</span>
          <span className={styles.tag}>Financial Services</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
