import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <nav className="nav-layout">
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link href="/">Home</Link>
            </li>
            <li className="nav-list-item">
              <Link href="/blogs">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
