"use client";
import { useState } from "react";

export default function AddMediaModal({ onAdd }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("http://localhost:5000/api/media", {
        method: "POST",
        body: form
      });

      const data = await res.json();
      onAdd(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ border: "2px dashed black", padding: 20 }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>+</button>
    </div>
  );
}
