"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.querySelector(".goog-te-gadget")) return;
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!document.getElementById("google_translate_element")) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

useEffect(() => {
  const wrap = document.getElementById("page-title-wrap");
  if (!wrap) return;

  const startY = wrap.offsetTop;

  const onScroll = () => {
    if (window.scrollY > startY) {
      wrap.classList.add("fixed");
    } else {
      wrap.classList.remove("fixed");
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);






  const pageTitle =
    {
      "/": "HOME",
      "/ministry": "MINISTRY",
      "/news": "NEWS",
      "/media": "MEDIA",
      "/contact": "CONTACT US",
      "/prayerrequest": "PRAYER REQUEST",
    }[pathname] || "HOME";

  const links = [
    { href: "/", label: "HOME" },
    { href: "/ministry", label: "MINISTRY" },
    { href: "/news", label: "NEWS" },
    { href: "/media", label: "MEDIA" },
    { href: "/contact", label: "CONTACT US" },
    { href: "/prayerrequest", label: "PRAYER REQUEST" },
  ];

  return (
    <>
            <div id="page-title-wrap">
                <h2>{pageTitle}</h2>
            </div>


      <div id="google_translate_element"></div>

      <nav>
        <div className="oi">
          <ul>
            {links
              .filter(link => link.href !== pathname)
              .map(link => (
                <li
                  key={link.href}
                  className="stt"
                  style={{ fontSize: "25px" }}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
          </ul>
        </div>

        <figure>
          <video
            className="boss"
            src="/video/sam.mp4.mp4"
            muted
            loop
            autoPlay
          />
        </figure>

        <p>
          <strong>RAJASTHAN GLORIOUS PRAYER MISSION (RGPM)</strong>
        </p>
      </nav>
    </>
  );
}
