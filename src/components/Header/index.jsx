import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Search, Sunny } from "@mui/icons-material";
import Blog from "../../assets/logo-blog.jpg";

export default function Header() {
  return (
    <div className="header-container">
      <a href="/">
        <div className="logo">
          <img src={Blog} alt="blog" />
        </div>
      </a>
      <div className="navbar-container">
        <div className="input-wrap">
          <Search className="search-icon" />
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
        <div className="btn-switch">
          <Sunny className="sunny-icon" />
        </div>
        <div className="btn-changeLanguage">
          <LanguageIcon />
          <span>Tiếng Việt</span>
          <ArrowDropDownIcon />
        </div>
        <Link to="/auth/signup" className="btn-login">
          Đăng ký
        </Link>
      </div>
    </div>
  );
}
