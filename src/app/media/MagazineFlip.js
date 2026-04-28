"use client";

import { useEffect, useRef } from "react";

export default function MagazineFlip({ pages = [] }) {
  const bookRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!pages || pages.length < 2) return;
    if (!bookRef.current) return;
    if (initializedRef.current) return; // 🔥 KEY LINE

    let destroyed = false;

    const load = async () => {
      if (!window.jQuery) {
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = "https://code.jquery.com/jquery-3.6.0.min.js";
          s.onload = resolve;
          document.body.appendChild(s);
        });
      }

      if (!window.jQuery.fn.turn) {
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = "/turn.min.js";
          s.onload = resolve;
          document.body.appendChild(s);
        });
      }

      if (!destroyed && bookRef.current) {
        window.jQuery(bookRef.current).turn({
          width: 600,
          height: 405,
          autoCenter: true,
          gradients: true,
          acceleration: true
        });

        initializedRef.current = true; // 🔥 MARK INITIALIZED
      }
    };

    load();

    return () => {
      destroyed = true;
    };
  }, [pages]);

  if (!pages || pages.length === 0) {
    return <p style={{ textAlign: "center" }}>No magazine pages</p>;
  }

  return (
    <div id="album" ref={bookRef}>
      {pages.map((p, i) => (
        <div
          key={i}
         style={{
  backgroundImage: `url(http://localhost:5000${p}?v=${Date.now()})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "100% 100%"
}}

        />
      ))}
    </div>
  );
}
