"use client";
import { useEffect, useState } from "react";

export default function MinistryGrid() {
  const [items, setItems] = useState([]);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/ministry")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const remove = async (id) => {
    await fetch(`http://localhost:5000/api/ministry/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setItems(items.filter((i) => i._id !== id));
  };

  return (
    <div className="grid">
      {items.map((i) => (
        <div key={i._id}>
          {i.type === "image" ? (
            <img src={`http://localhost:5000/uploads/${i.file}`} />
          ) : (
            <video src={`http://localhost:5000/uploads/${i.file}`} controls />
          )}
          {isAdmin && <button onClick={() => remove(i._id)}>🗑</button>}
        </div>
      ))}
      {isAdmin && <button>➕ Add</button>}
    </div>
  );
}
