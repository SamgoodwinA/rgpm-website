"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AddMedia() {
  const params = useSearchParams();
  const section = params.get("section");
  const [file, setFile] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    fd.append("section", section);
    fd.append("mediaType", file.type.startsWith("video") ? "video" : "image");
    fd.append("file", file);

    await fetch("http://localhost:5000/api/ministry", {
      method: "POST",
      body: fd
    });

    alert("Uploaded");
  };

  return (
    <>
      <h2>Add to {section}</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
    </>
  );
}
