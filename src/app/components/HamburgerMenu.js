"use client";

export default function HamburgerMenu() {
  return (
    <div className="menu-wrap">
      <input type="checkbox" className="toggler" />

      <div className="hamburger">
        <div></div>
      </div>

      <div className="menu">
        <div>
          <div>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/ministry">Ministry</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/media">Media</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/prayerrequest">Prayer Request</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
