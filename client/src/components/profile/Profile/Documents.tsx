import { useState, useEffect, useRef } from "react";
import styles from "./Documents.module.css";
import { FileText, Upload, Trash2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;

  content?: string;
}
//TODO:REVER
export default function Documents({ isCompanyView = false }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadDocuments = () => {
      const savedDocuments = localStorage.getItem("userDocuments");
      if (savedDocuments) {
        try {
          const parsedDocs = JSON.parse(savedDocuments);

          const processedDocs = parsedDocs.map((doc: Document) => {
            if (doc.content) {
              const byteCharacters = atob(doc.content);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);
              const url = URL.createObjectURL(blob);

              return { ...doc, url };
            }
            return doc;
          });

          setDocuments(processedDocs);
        } catch (error) {
          console.error("Erro ao carregar documentos do localStorage:", error);

          setDocuments([]);
        }
      }
    };

    loadDocuments();
  }, []);

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem("userDocuments", JSON.stringify(documents));
    }
  }, [documents]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base64 = reader.result.toString().split(",")[1];
          resolve(base64);
        } else {
          reject(new Error("Erro ao converter arquivo para base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocuments: Document[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const base64Content = await convertFileToBase64(file);

        const id = Math.random().toString(36).substring(2, 9);

        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        const fileType = getFileType(fileExtension);

        const url = URL.createObjectURL(file);

        newDocuments.push({
          id,
          name: file.name,
          type: fileType,
          url,
          content: base64Content,
        });
      } catch (error) {
        console.error("Erro ao processar arquivo:", error);
      }
    }

    setDocuments((prev) => [...prev, ...newDocuments]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileType = (extension: string): string => {
    switch (extension) {
      case "pdf":
        return "PDF";
      case "doc":
      case "docx":
        return "Word";
      case "txt":
        return "Text";
      case "jpg":
      case "jpeg":
      case "png":
        return "Image";
      default:
        return "File";
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => {
      const filtered = prev.filter((doc) => doc.id !== id);

      // Se não sobrar nenhum documento, limpar o localStorage
      if (filtered.length === 0) {
        localStorage.removeItem("userDocuments");
      } else {
        localStorage.setItem("userDocuments", JSON.stringify(filtered));
      }

      return filtered;
    });
  };

  return (
    <div className={styles.documentsContainer}>
      <div className={styles.documentsHeader}>
        <h2 className={styles.sectionTitle}>
          <FileText size={20} color="#9158d6" />
          Documents
        </h2>
      </div>

      <div className={styles.documentsContent}>
        {!isCompanyView && (
          <div className={styles.uploadContainer} onClick={handleUploadClick}>
            <div className={styles.uploadIcon}>
              <Upload size={32} color="#9158d6" />
            </div>
            <p>Click to upload CV, certificates or other documents</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              multiple
            />
          </div>
        )}

        {documents.length > 0 && (
          <div className={styles.documentsList}>
            {documents.map((document) => (
              <div key={document.id} className={styles.documentItem}>
                <FileText size={24} color="#9158d6" />
                <div className={styles.documentInfo}>
                  <span className={styles.documentName}>{document.name}</span>
                  <span className={styles.documentType}>{document.type}</span>
                </div>
                {!isCompanyView && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteDocument(document.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
