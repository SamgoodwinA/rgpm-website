"use client";

import HamburgerMenu from "./HamburgerMenu";


import { useEffect, useState } from "react";

import Navbar from "./navbar";

import Footer from "./footer";

export default function HomeContent() {
  const [slides, setSlides] = useState([]);
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
    let counter = 1;
    const interval = setInterval(() => {
      const el = document.getElementById("radio" + counter);
      if (el) el.checked = true;
      counter++;
      if (counter > 12) counter = 1;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminToken(localStorage.getItem("adminToken"));
    }
  }, []);


<div className="slide first">
  <img
    src={`http://localhost:5000/uploads/home-slider/slide1.jpg`}
    alt=""
    onError={(e) => (e.currentTarget.src = "/images/mln1.jpg")}
  />
</div>

useEffect(() => {
  if (typeof window !== "undefined") {
    setAdminToken(localStorage.getItem("adminToken"));
  }
}, []);


 const handleUpload = async (e) => {
  e.preventDefault();

  const f = e.target;
  const file = f.file.files[0];

  if (!file) {
    alert("Select image file");
    return;
  }

  setUploading(true);

  const fd = new FormData();

  // ✅ THIS LINE WAS MISSING (ROOT CAUSE)
  fd.append("index", f.index.value);

  fd.append("file", file);

  const res = await fetch("http://localhost:5000/api/home-slider", {
    method: "POST",
    body: fd
  });

  const json = await res.json();

  setUploading(false);
  setShowUpload(false);

  if (!json.success) {
    alert(json.message || "Upload failed");
    return;
  }

  // 🔄 refresh so slider reloads images
  window.location.reload();
};


  return (
    <>
       <HamburgerMenu />

        <Navbar />

      {/* ADMIN CONTROLS ROW (same pattern as media) */}
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

      <section className="features">
        <footer style={{ fontSize: "25PX" }}>
          Welcome to RGPM We're glad you're here!
        </footer>

       <div className="slider">
  <div className="slides">
    <input type="radio" name="radio-btn" id="radio1" />
    <input type="radio" name="radio-btn" id="radio2" />
    <input type="radio" name="radio-btn" id="radio3" />
    <input type="radio" name="radio-btn" id="radio4" />
    <input type="radio" name="radio-btn" id="radio5" />
    <input type="radio" name="radio-btn" id="radio6" />
    <input type="radio" name="radio-btn" id="radio7" />
    <input type="radio" name="radio-btn" id="radio8" />
    <input type="radio" name="radio-btn" id="radio9" />
    <input type="radio" name="radio-btn" id="radio10" />
    <input type="radio" name="radio-btn" id="radio11" />
    <input type="radio" name="radio-btn" id="radio12" />

    <div className="slide first">
      <img
        src="http://localhost:5000/uploads/home-slider/slide1.jpg"
        onError={(e) => (e.currentTarget.src = "/images/mln1.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide2.jpg"
        onError={(e) => (e.currentTarget.src = "/images/lkmm.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide3.jpg"
        onError={(e) => (e.currentTarget.src = "/images/samsam15,jpg.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide4.jpg"
        onError={(e) => (e.currentTarget.src = "/images/id.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide5.jpg"
        onError={(e) => (e.currentTarget.src = "/images/samsam1.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide6.jpg"
        onError={(e) => (e.currentTarget.src = "/images/io.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide7.jpg"
        onError={(e) => (e.currentTarget.src = "/images/samsam15.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide8.jpg"
        onError={(e) => (e.currentTarget.src = "/images/iy.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide9.jpg"
        onError={(e) => (e.currentTarget.src = "/images/edwad9.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide10.jpg"
        onError={(e) => (e.currentTarget.src = "/images/edwat1.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide11.jpg"
        onError={(e) => (e.currentTarget.src = "/images/jann1.jpg")}
        alt=""
      />
    </div>

    <div className="slide">
      <img
        src="http://localhost:5000/uploads/home-slider/slide12.jpg"
        onError={(e) => (e.currentTarget.src = "/images/samsam5.jpg")}
        alt=""
      />
    </div>

    <div className="navigation-auto">
      <div className="auto-btn1"></div>
      <div className="auto-btn2"></div>
      <div className="auto-btn3"></div>
      <div className="auto-btn4"></div>
      <div className="auto-btn5"></div>
      <div className="auto-btn6"></div>
      <div className="auto-btn7"></div>
      <div className="auto-btn8"></div>
      <div className="auto-btn9"></div>
      <div className="auto-btn10"></div>
      <div className="auto-btn11"></div>
      <div className="auto-btn12"></div>
    </div>
  </div>

  <div className="navigation-manual">
    <label htmlFor="radio1" className="manual-btn"></label>
    <label htmlFor="radio2" className="manual-btn"></label>
    <label htmlFor="radio3" className="manual-btn"></label>
    <label htmlFor="radio4" className="manual-btn"></label>
    <label htmlFor="radio5" className="manual-btn"></label>
    <label htmlFor="radio6" className="manual-btn"></label>
    <label htmlFor="radio7" className="manual-btn"></label>
    <label htmlFor="radio8" className="manual-btn"></label>
    <label htmlFor="radio9" className="manual-btn"></label>
    <label htmlFor="radio10" className="manual-btn"></label>
    <label htmlFor="radio11" className="manual-btn"></label>
    <label htmlFor="radio12" className="manual-btn"></label>
  </div>
</div>

      </section>

      <br />

      <footer style={{ fontSize: "35PX" }}>Dear all</footer>

      <h4 style={{ textAlign: "justify" }}>
        Greeting to you in the mighty name of Jesus Christ! In the year 1997,
        Missionary Suresh Kumar received a call from God to proclaim the gospel in
        the midst of the people of Rajasthan. The Rajasthan Glorious Prayer
        Mission (RGPM) was formed as a Government Registered Trust. Brother Sam S.
        Jawahar is serving as head of our Mission. RGPM is governed by five members
        Executive Committee and doing well under the guidance of them.
      </h4>

      <footer style={{ fontSize: "35PX" }}>Evangelism</footer>

      <h4 style={{ textAlign: "justify" }}>
        It is a primary vision of our RGPM ministry. Our goal is to proclaim the
        gospel to the people who have never heard of Jesus Christ as the true
        living God and the only saviour of the world. Centered on this vision,
        evangelism is being carried out in Rajasthan with 139 north missionaries
        in 7 districts. We are doing gospel ministry to the new people through
        distributing pamphlets, individually meeting with the people, house
        meetings. Our Missionaries face tremendous persecution from their own
        villagers as well as religious fanatics. Yet we are serving the Lord with
        zeal and enthusiasm to preach the Gospel.
      </h4>

   <section className="features home-church">
  <footer className="home-footer">Church Establishment</footer>

  <div className="box home-box">
    <img src="/images/tv.png" alt="amazing scean" />

    <h1>BACK BONE OF RGPM</h1>
    <h1>Mrs.YESUVADIAL</h1>
    <h1>(Mother of Bro.D.Suresh Kumar)</h1>

    <img src="/images/cv.jpg" alt="amazing scean" />

    <h1>RGPM FOUNDER</h1>
    <h1>MISSIONARY D.SURESH KUMAR</h1>
    <h1>&</h1>
    <h1>RGPM PRESIDENT</h1>
    <h1>SAM S.JAWAHAR</h1>
  </div>

  <footer className="home-footer">(RGPM) Committee Members</footer>

  <div className="box home-box">
    <img src="/images/oj.jpg" alt="amazing scean" />
  </div>
</section>


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

      {/* <section className="features">
        
      </section> */}

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

      {/* PLUS BUTTON FOR ADMIN (same style as media) */}
      {adminToken && (
        <div className="plus-btn" onClick={() => setShowUpload(true)}>＋</div>
      )}

    {showUpload && (
  <div className="upload-modal">
    <form className="upload-form" onSubmit={handleUpload}>

      {/* ✅ SLIDE SELECTION — THIS IS THE FIX */}
      <label className="upload-label">
        Select Slide
        <select name="index" defaultValue="1">
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              Slide {i + 1}
            </option>
          ))}
        </select>
      </label>

      {/* ✅ IMAGE UPLOAD */}
      <label className="upload-label">
        Image file (jpg / png)
        <input
          name="file"
          type="file"
          accept="image/*"
          required
        />
      </label>

      <div className="upload-actions">
        <button
          className="upload-btn"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Replace Slide"}
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



      <iframe width="0" height="0" src="/Audio/sam.MP3.wav"></iframe>

      <audio src="/Audio/Puthu_kirubaigal.mp3" loop autoPlay></audio>

     

      <Footer />
    </>
  );
}
