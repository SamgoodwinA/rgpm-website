"use client";

import HamburgerMenu from "../components/HamburgerMenu";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./contact.css";

export default function ContactPage() {

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

      {/* REGISTERED OFFICE */}
      <section className="features contact-reset">
        <footer>REGISTERED OFFICE</footer>

        <div className="contact-content">
          <p>📍 R.G.P.M., 32/23, Cave Street</p>
          <p>Near TWAD Office, Nagercoil – 629001</p>
          <p>Tamil Nadu, India</p>
          <p>📞 Phone: 04652-420413</p>
          <p>📱 Cell: 09486207413</p>
          <p>✉️ headofficergpm@gmail.com</p>
        </div>
   

      {/* FIELD OFFICE */}
      
        <footer>FIELD OFFICE</footer>

        <div className="contact-content">
          <p>R.G.P.M., Sathirampur</p>
          <p>Dungarpur District</p>
          <p>Rajasthan – 314001</p>
          <p>📞 Phone: 09443152148</p>
        </div>
   
        <footer>VISIT US</footer>

        <div className="map-box">
          <iframe
            src="https://www.google.com/maps?q=8.1836589,77.4270231&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* SOCIAL LINKS (UNCHANGED AS YOU ASKED) */}
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

      {/* FLOATING WHATSAPP – NOT REMOVED */}
      <a
        href="https://wa.me/919486866413"
        className="whatsapp-float"
        target="_blank"
      >
        💬
      </a>

      {/* SCROLL TO TOP – NOT REMOVED */}
      <button
        id="scrollTopBtn"
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      {/* AUDIO – UNCHANGED */}
      <iframe width="0" height="0" src="/Audio/sam.MP3.wav"></iframe>
      <audio src="/Audio/Puthu_kirubaigal.mp3" loop autoPlay />

      <Footer />
    </>
  );
}
