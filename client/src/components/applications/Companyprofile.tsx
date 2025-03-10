import { useEffect, useState } from "react";
import styles from "./CompanyProfile.module.css";
interface jobofferstatus {
  total_activejobs: number;
  total_application: number;
  tota_interviews: number;
}
export default function CompanyProfile() {
  const [jobofferstatus, setjobofferstatus] = useState<jobofferstatus>({
    total_activejobs: 0,
    total_application: 0,
    tota_interviews: 0,
  });

  useEffect(() => {
    const fetchjobofferstatus = async () => {
      try {
        const response = await fetch("");
        if (!response.ok) {
          throw new Error("Failed to fetch job offer status");
        }
      } catch (error) {}
    };
    fetchjobofferstatus();
  }, []);

  return <div></div>;
}
