"use client";

import HamburgerMenu from "../components/HamburgerMenu";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import MagazineFlip from "./MagazineFlip";
import "./media.css";
import Footer from "../components/footer";

export default function MediaPage() {
  const [items, setItems] = useState([]);
  const [adminToken, setAdminToken] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replaceAllBooks, setReplaceAllBooks] = useState(false);


  useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    const onScroll = () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminToken(localStorage.getItem("adminToken"));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/media")
      .then(res => res.json())
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load media"))
      .finally(() => setLoading(false));
  }, []);

  const magazinePages = items
    .filter(i => i.type === "image" && i.filePath?.includes("book"))
    .sort((a, b) => {
      const na = parseInt(a.filePath.match(/book(\d+)/)?.[1] || 0);
      const nb = parseInt(b.filePath.match(/book(\d+)/)?.[1] || 0);
      return na - nb;
    })
    .map(i => i.filePath);

  const videos = items.filter(i => i.type === "youtube");
  const pdf = items.find(i => i.type === "pdf");

  const deleteItem = async (id) => {
    if (!adminToken) return alert("Admin only");
    if (!confirm("Delete this item?")) return;

    await fetch(`http://localhost:5000/api/media/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    setItems(prev => prev.filter(i => i._id !== id));
  };

const handleUpload = async (e) => {
  e.preventDefault();
  if (!adminToken) return alert("Admin only");

  const f = e.target;
  const files = f.file.files;
  const file = files && files.length === 1 ? files[0] : null;
  const youtubeUrl = f.youtubeUrl.value.trim();
  const text = f.text.value.trim();
  const replaceFile = f.replaceFile?.value?.trim() || "";

  if (
    !youtubeUrl &&
    (
      (!replaceAllBooks && !file) ||
      (replaceAllBooks && (!files || files.length === 0))
    )
  ) {
    return alert("Select file or YouTube URL");
  }

  setUploading(true);

  const fd = new FormData();

  // ✅ ADDED — NOTHING ELSE CHANGED
  if (replaceAllBooks) {
    fd.append("replaceAllBooks", "true");

    // ✅ THIS WAS MISSING (REQUIRED)
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }
  }

  if (replaceFile) fd.append("replaceFile", replaceFile);
  if (file) fd.append("file", file);
  if (youtubeUrl) fd.append("youtubeUrl", youtubeUrl);
  if (text) fd.append("text", text);

  const res = await fetch("http://localhost:5000/api/media", {
    method: "POST",
    headers: { Authorization: `Bearer ${adminToken}` },
    body: fd
  });

  const json = await res.json();

  /* close modal & reset state */
  setShowUpload(false);
  setUploading(false);
  f.reset();

  /* 🔄 FORCE RELOAD so:
     - new PDF is picked
     - replaced book images load
     - Turn.js reinitializes cleanly */
  setTimeout(() => {
    window.location.reload();
  }, 300);
};



  return (
    <div className="media-root">

      <HamburgerMenu />

       <Navbar />

      <div className="controls-row" style={{ justifyContent: "flex-end" }}>
        {!adminToken ? (
          <a className="admin-link" href="/admin">Admin login</a>
        ) : (
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("adminToken");
              setAdminToken(null);
            }}
          >
            Logout
          </button>
        )}
      </div>

      

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

     <section className="features">
  <footer style={{ fontSize: "40px", textAlign: "center" }}>
    Magazine...
  </footer>

  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "15px"
    }}
  >
    <div
      style={{
        maxWidth: "100%",
        marginLeft: "-10px",
        marginRight: "-10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {magazinePages.length > 0 && (
        <MagazineFlip pages={magazinePages} />
      )}

      <div style={{ marginTop: 20 }}>
        {pdf ? (
          <>
       <a
  className="download-btn"
  href={`http://localhost:5000${pdf.filePath}?v=${pdf.updatedAt || Date.now()}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Preview
</a>

<a
  className="download-btn"
  href={`http://localhost:5000/api/media/download/${pdf.filePath.split("/").pop()}`}
>
  Download
</a>

          </>
        ) : (
          <button className="download-btn" disabled>
            No PDF available
          </button>
        )}
      </div>
    </div>
  </div>

  <footer style={{ fontSize: "40px", textAlign: "center" }}>
    Video...
  </footer>

  <div className="video-column" style={{ padding: "20px 0" }}>
    {videos.map(v => {
      const safeUrl = v.youtubeUrl
        .replace("youtube.com", "youtube-nocookie.com")
        .split("?")[0];

      return (
        <div key={v._id} className="video-card">
          <div className="video-wrapper">
            <iframe
              src={safeUrl}
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {v.text && <h1 className="mag-text">{v.text}</h1>}

         {adminToken && (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
    <button
      className="delete-btn"
      onClick={() => deleteItem(v._id)}
    >
      Delete
    </button>
  </div>
)}

        </div>
      );
    })}
  </div>
</section>


      {adminToken && (
        <div className="plus-btn" onClick={() => setShowUpload(true)}>＋</div>
      )}

{showUpload && (
  <div className="upload-modal">
    <form className="upload-form" onSubmit={handleUpload}>
    <input
  name="text"
  placeholder="Description (optional)"
/>

<input
  name="youtubeUrl"
  placeholder="YouTube embed URL (optional)"
/>

<label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <input
    type="checkbox"
    checked={replaceAllBooks}
    onChange={(e) => setReplaceAllBooks(e.target.checked)}
  />
  Replace all book pages (book1 → book20)
</label>

{/* SINGLE PAGE REPLACE */}
{!replaceAllBooks && (
  <input
    name="replaceFile"
    placeholder="Replace file (example: book1.jpg)"
  />
)}

{/* MULTIPLE BOOK REPLACE */}
{replaceAllBooks && (
  <input
    name="file"
    type="file"
    accept="image/*"
    multiple
  />
)}

{/* SINGLE FILE (PDF / IMAGE) — ONLY WHEN NOT replacing all */}
{!replaceAllBooks && (
  <input
    name="file"
    type="file"
    accept="image/*,.pdf"
  />
)}


      <small style={{ opacity: 0.7 }}>
        • Upload PDF to replace magazine PDF  
        • Upload image + replaceFile to replace one book page  
        • Upload multiple images to replace book1 → book20
      </small>

      <div className="upload-actions">
        <button disabled={uploading} className="upload-btn">
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setShowUpload(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}



   <button
        id="scrollTopBtn"
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

    <Footer />

    </div>
  );
}
