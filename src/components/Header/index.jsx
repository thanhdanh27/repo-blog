import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  ArrowDropDown,
  Login,
  Logout,
  Person,
  Search,
  Sunny,
} from "@mui/icons-material";
import Blog from "../../assets/logo-blog.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const hasToken = !!accessToken;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    navigate("/"); // điều hướng sau khi xóa token
  };
  // console.log(hasToken);

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
        {hasToken ? (
          <div
            onClick={() => {
              setOpen(!isOpen);
            }}
            className="accountMenu"
          >
            <div className="avatar-wrap">
              <img
                src={
                  accessToken.avatarURL
                    ? accessToken.avatarURL
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                }
                alt="avt"
              />
            </div>
            <span className="nameAdmin">{accessToken.userName}</span>
            <ArrowDropDown />
            {isOpen && (
              <div className="dropdownAccount">
                <ul>
                  <a target="_blank" blank href="/admin">
                    <li>
                      <Person />
                      <span>Dashboard</span>
                    </li>
                  </a>
                  <li>
                    <Person />
                    <span>Profile</span>
                  </li>

                  <li>
                    <Person />
                    <span>Profile</span>
                  </li>
                  <li className="logout-btn">
                    <a href="/" onClick={handleLogout}>
                      <Login />
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          // <a href="/" onClick={handleLogout}>
          //   <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          //     <Logout />
          //     <span>{accessToken?.userName}</span>
          //   </div>
          // </a>
          <Link to="/auth/signup" className="btn-login">
            Đăng ký
          </Link>
        )}
      </div>
    </div>
  );
}
