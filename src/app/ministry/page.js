// src/app/ministry/page.js
"use client";
import HamburgerMenu from "../components/HamburgerMenu";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import "./ministry.css";
import Footer from "../components/footer";

export default function MinistryPage() {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState("gospel");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminToken, setAdminToken] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);


    useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    const onScroll = () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    setAdminToken(t);
  }, []);

  useEffect(() => {
    setError("");
    setLoading(true);
    fetch(`http://localhost:5000/api/ministry/${section}`)
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Fetch error");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
      })
      .catch(err => {
        setError("Failed to load ministry items");
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [section]);

  const deleteItem = async (id) => {
    if (!adminToken) return alert("Please login as admin");
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/ministry/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Delete failed");
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      alert(err.message || "Delete error");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!adminToken) return alert("Please login as admin");
    const form = e.target;
    const file = form.file.files[0];
    const sectionVal = form.section.value;
    if (!file) return alert("Choose file");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("section", sectionVal);
      const res = await fetch("http://localhost:5000/api/ministry", {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload failed");
      setItems(prev => [json.item, ...prev]);
      setShowUpload(false);
    } catch (err) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="ministry-root">

      <HamburgerMenu />
      
      <Navbar />

      <div className="controls-row">
        <div className="section-buttons">
          <button className={`section-btn ${section === "gospel" ? "active" : ""}`} onClick={() => setSection("gospel")}>Gospel</button>
          <button className={`section-btn ${section === "children" ? "active" : ""}`} onClick={() => setSection("children")}>Children</button>
          <button className={`section-btn ${section === "church" ? "active" : ""}`} onClick={() => setSection("church")}>Church</button>
        </div>

        <div className="auth-area">
          {!adminToken ? (
            <a className="admin-link" href="/admin">Admin login</a>
          ) : (
            <button className="logout-btn" onClick={() => { localStorage.removeItem("adminToken"); setAdminToken(null); }}>Logout</button>
          )}
        </div>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {items.length === 0 && !loading && <p className="status">No records</p>}

  <section className="features" style={{margin: "10px"}}>
    <footer style={{fontSize: "45PX"}}>
  {section === "gospel"
    ? "Gospel Ministry"
    : section === "children"
    ? "Children Ministry"
    : "Church Ministry"}
</footer>

      <div className="box">
        {items.map(item => (
          <div key={item._id} className="media-card">
            {item.type === "image" ? (
              <img className="media-img" src={`http://localhost:5000${item.filePath}`} width="300" alt={item.originalName || item.filename} />
            ) : (
              <video className="media-video" controls autoPlay muted loop width="300">
                <source src={`http://localhost:5000${item.filePath}`} />
              </video>
            )}

            
            {adminToken && (
              <div className="admin-controls">
                <button className="delete-btn" onClick={() => deleteItem(item._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}

        {adminToken && (
          <div className="media-card add-card" title="Add new item">
            <div className="plus-btn" onClick={() => setShowUpload(true)}>＋</div>
          </div>
        )}
      </div>

      {showUpload && (
        <div className="upload-modal">
          <form className="upload-form" onSubmit={handleUpload}>
            <label className="upload-label">
              Section
              <select name="section" defaultValue={section}>
                <option value="gospel">Gospel</option>
                <option value="children">Children</option>
                <option value="church">Church</option>
              </select>
            </label>
            <label className="upload-label">
              File
              <input name="file" type="file" accept="image/*,video/*" />
            </label>
            <div className="upload-actions">
              <button className="upload-btn" type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
              <button className="cancel-btn" type="button" onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

</section>



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
