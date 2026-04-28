"use client";

import HamburgerMenu from "../components/HamburgerMenu";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./prayer.css";

export default function PrayerRequestPage() {

  useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    const onScroll = () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <HamburgerMenu />
      <Navbar />

      {/* PRAYER REQUEST */}
      <section className="features">
        <footer style={{ fontSize: "40px" }}>Prayer Request Form</footer>

        <div className="prayer-form-box">
          {/* 🔴 PASTE YOUR GOOGLE FORM EMBED SRC HERE */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfVmiEWy6uO_Gl2wEK0p37xrwOb46Fd5eUTcGPvdYnq5NbV9w/viewform?embedded=true"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
    

      {/* IMAGE SECTION (UNCHANGED STYLE IDEA) */}
      
       <div className="box">
  <img
    src="/images/xyzzz.png"
    alt="Prayer"
    className="prayer-image"
  />
</div>

      </section>

      {/* SOCIAL LINKS – SAME AS CONTACT */}
      <div className="wrapperer">
        <a href="https://www.facebook.com/rgpmindia">
          Facebook <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCiUdLo5_I1XAMkCaTa1u3yw">
          Youtube <i className="fab fa-youtube"></i>
        </a>
        <a href="https://www.instagram.com/rajasthangloriousprayermission/">
          Instagram <i className="fab fa-instagram"></i>
        </a>
        <a href="https://wa.me/919486866413/?text=">
          whatsapp <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* FLOATING WHATSAPP (SAME AS CONTACT) */}
      <a
        href="https://wa.me/919486866413"
        className="whatsapp-float"
        target="_blank"
      >
        💬
      </a>

      {/* SCROLL TO TOP */}
      <button
        id="scrollTopBtn"
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      {/* AUDIO (UNCHANGED) */}
      <iframe width="0" height="0" src="/Audio/sam.MP3.wav"></iframe>
      <audio src="/Audio/Puthu_kirubaigal.mp3" loop autoPlay />

      <Footer />
    </>
  );
}
