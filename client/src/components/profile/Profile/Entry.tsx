import { Pencil, Save } from "lucide-react";
import styles from "./Entry.module.css";
import { useState } from "react";

type propsType = {
  title: string;
  date: string;
  description: string;
};

export default function Entry(props: propsType) {
  const { title, date, description } = props;
  const [data, setData] = useState({ title, date, description });

  const [editing, setEditing] = useState(false);

  function handleSave() {
    setEditing(false);
    console.log(data);
    //TODO: Atualizar os dados no servidor
  }

  return editing ? (
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Title"
        className={styles.inputField}
        value={data.title}
        required
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Date"
        className={styles.inputField}
        value={data.date}
        required
        onChange={(e) => setData({ ...data, date: e.target.value })}
      />

      <input
        type="text"
        placeholder="Description"
        className={styles.inputField}
        value={data.description}
        required
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <button className={styles.saveButton} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  ) : (
    <div className={styles.entryContainer}>
      <div className={styles.displayContent}>
        <h3 className={styles.contentTitle}>{data.title}</h3>
        <p className={styles.contentSubtitle}>{data.date}</p>
        {description && (
          <p className={styles.contentDescription}>{data.description}</p>
        )}
      </div>
      <div>
        {!editing ? (
          <Pencil
            size={24}
            className={styles.editIcon}
            onClick={() => setEditing(true)}
          />
        ) : (
          <Save size={24} className={styles.saveIcon} onClick={handleSave} />
        )}
      </div>
    </div>
  );
}
