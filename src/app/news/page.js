// src/app/news/page.js
"use client";

import HamburgerMenu from "../components/HamburgerMenu";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import "./news.css";
import Footer from "../components/footer";

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);


  

  // 🔐 load admin token (same as media)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminToken(localStorage.getItem("adminToken"));
    }
  }, []);

  // 📰 fetch news
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("http://localhost:5000/api/news")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Failed to load news"))
      .finally(() => setLoading(false));
  }, []);

  // 🗑️ delete (admin only)
  const deleteItem = async (id) => {
    if (!adminToken) return alert("Admin login required");
    if (!confirm("Delete this item?")) return;

    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (res.ok) {
      setItems(prev => prev.filter(i => i._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  // ⬆️ upload (image / video / youtube)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!adminToken) return alert("Admin login required");

    const form = e.target;
    const file = form.file.files[0];
    const youtubeUrl = form.youtubeUrl.value.trim();
    const text = form.text.value.trim();

    if (!file && !youtubeUrl) {
      return alert("Select a file OR provide a YouTube URL");
    }

    setUploading(true);
    try {
      const fd = new FormData();

      if (youtubeUrl) {
        fd.append("youtubeUrl", youtubeUrl);
      } else {
        fd.append("file", file);
      }

      if (text) fd.append("text", text);

      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload failed");

      setItems(prev => [json.item || json, ...prev]);
      setShowUpload(false);
      form.reset();
    } catch (err) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

    useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    const onScroll = () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="news-root">

      <HamburgerMenu />
      <Navbar />

      {/* 🔐 ADMIN LOGIN / LOGOUT — SAME AS MEDIA */}
      <div className="controls-row" style={{ justifyContent: "flex-end" }}>
        {!adminToken ? (
          <a className="admin-link" href="/admin">
            Admin login
          </a>
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
        <footer style={{fontSize: "45PX"}}>NEWS & PRAYER REQUEST</footer>
        <div className="box">
          {items.map(item => (
            <div key={item._id} className="media-card">
              {item.type === "image" && (
                <img
                  className="media-img"
                  src={`http://localhost:5000${item.filePath}`}
                />
              )}

              {item.type === "video" && (
                <video className="media-video" controls>
                  <source src={`http://localhost:5000${item.filePath}`} />
                </video>
              )}

              {item.type === "youtube" && (
                <div className="video-wrapper">
                  <iframe src={item.youtubeUrl} allowFullScreen />
                </div>
              )}

              {item.text && <h1 className="media-text">{item.text}</h1>}

              {adminToken && (
                <div className="admin-controls">
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ➕ PLUS BUTTON (ADMIN ONLY) */}
          {adminToken && (
            <div className="media-card add-card">
              <div className="plus-btn" onClick={() => setShowUpload(true)}>
                ＋
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ⬆️ UPLOAD MODAL */}
      {showUpload && (
        <div className="upload-modal">
          <form className="upload-form" onSubmit={handleUpload}>
            <label className="upload-label">
              Description (optional)
              <input name="text" placeholder="Description (optional)" />
            </label>

            <label className="upload-label">
              YouTube URL (optional)
              <input name="youtubeUrl" placeholder="https://youtube.com/embed/..." />
            </label>

            <label className="upload-label">
              File (image / video)
              <input name="file" type="file" accept="image/*,video/*" />
            </label>

            <div className="upload-actions">
              <button className="upload-btn" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

  {/* SCROLL TO TOP – NOT REMOVED */}
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
