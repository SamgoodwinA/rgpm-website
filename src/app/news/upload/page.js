"use client";

import { useState } from "react";

export default function NewsUpload() {
  const token = localStorage.getItem("adminToken");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.target);

    await fetch("http://localhost:5000/api/news", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    setLoading(false);
    window.location.href = "/news";
  };

  return (
    <form onSubmit={submit}>
      <input name="text" placeholder="Description" />
      <input name="youtubeUrl" placeholder="YouTube embed URL (optional)" />
      <input type="file" name="file" />
      <button disabled={loading}>Upload</button>
    </form>
  );
}
