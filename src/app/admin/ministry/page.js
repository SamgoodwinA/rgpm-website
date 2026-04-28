"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed");
      localStorage.setItem("adminToken", json.token);
      setMsg("Logged in");
      location.href = "/ministry";
    } catch (err) {
      setMsg(err.message || "Error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button type="submit">Login</button></div>
      </form>
      <div>{msg}</div>
    </div>
  );
}
