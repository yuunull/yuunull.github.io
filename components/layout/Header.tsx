import React from "react";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <nav className="nav-layout">
          <ul className="nav-list">
            <li className="nav-list-item">
              <a href="#profile">Profile</a>
            </li>
            <li className="nav-list-item">
              <a href="#blog">Blog</a>
            </li>
            <li className="nav-list-item">
              <a href="#projects">Projects</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
