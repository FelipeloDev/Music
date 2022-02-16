import { Avatar } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavbarItem from "../../atoms/NavbarItem";
import "./Navbar.css";

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <ul className="nav__list">
        <li className="nav__item">
          <NavbarItem url={"#"} icon={<HomeIcon />} title="Home" />
        </li>

        <li className="nav__item">
          <NavbarItem url={"#"} icon={<FavoriteIcon />} title="Favorites" />
        </li>
        <li className="nav__item">
          <NavbarItem url={"#"} icon={<SearchIcon />} title="Search" />
        </li>
        <li className="nav__item">
          <a href={"#"}>
            <Avatar
              src={
                "https://scontent.feoh1-1.fna.fbcdn.net/v/t1.6435-9/72939064_2500859936663617_4947094729129984000_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHy7EoAPfsJRtN6ZavMbYd38FD0lT6DpgLwUPSVPoOmAr4ZQuINWZwQ3kScsIet_mFhU_y56hAStC40Wg9ikQ3a&_nc_ohc=09m22k6v7E0AX83Fy49&_nc_ht=scontent.feoh1-1.fna&oh=00_AT-RJOJx4gFWaMcWEq63U2qOCr-_4eQp-2D761pQYqFazg&oe=62318501"
              }
              alt="user"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
