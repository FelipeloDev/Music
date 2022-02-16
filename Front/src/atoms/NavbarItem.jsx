import React from "react";
import "./NavbarItem.css";

function NavbarItem({ icon, title, url }) {
  return (
    <a href={url}>
      <span>{icon}</span>
      <p className="navbarItem__title">{title}</p>
    </a>
  );
}

export default NavbarItem;
