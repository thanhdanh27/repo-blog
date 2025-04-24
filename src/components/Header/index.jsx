import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  ArrowDropDown,
  GridView,
  Label,
  Login,
  Logout,
  Person,
  Search,
  Sunny,
} from "@mui/icons-material";
import Blog from "../../assets/logo-blog.jpg";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../AvatarContext";
import axios from "axios";
import { BACKEND_URL } from "../../constant";

export default function Header({ onFilterChange }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { avatar } = useAvatar();
  const [isOpen, setOpen] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const hasToken = !!accessToken;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    navigate("/"); // điều hướng sau khi xóa token
  };

  const [tags, setTags] = useState([]);
  const baseApi = BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${baseApi}/Category`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch tags:", error);
      });
  }, []);

  const handleChangeTag = (tagId) => {
    onFilterChange(tagId);
    setOpenDropDown(!openDropDown);
  };

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
        <div
          onClick={() => {
            setOpenDropDown(!openDropDown);
          }}
          className="btn-changeLanguage"
        >
          <span>Phân loại</span>
          <ArrowDropDownIcon />
          {openDropDown && (
            <div className="dropdown">
              <ul>
                {tags !== undefined &&
                  tags.map((item, index) => {
                    return (
                      <li
                        onClick={() => {
                          handleChangeTag(item.categoryId);
                        }}
                        key={index}
                      >
                        {item.categoryName}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
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
                  avatar
                    ? avatar
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
                  <a href="/admin">
                    <li>
                      <GridView />
                      <span>Admin</span>
                    </li>
                  </a>

                  <li className="logout-btn">
                    <a href="/" onClick={handleLogout}>
                      <Login />
                      <span>Đăng xuất</span>
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
