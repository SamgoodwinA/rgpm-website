// src/app/admin/page.js
"use client";

import { useState } from "react";
import "./admin.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setWorking(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed");
      localStorage.setItem("adminToken", json.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login error");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="admin-root">
      <form className="admin-form" onSubmit={submit}>
        <h1 className="admin-title">Admin Login</h1>
        {error && <div className="admin-error">{error}</div>}
        <label className="admin-field">
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </label>
        <label className="admin-field">
          Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </label>
        <button className="admin-submit" type="submit" disabled={working}>{working ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
