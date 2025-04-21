import {
  ArrowDropDown,
  Login,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import "./AdminHeader.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../AvatarContext";

export default function AdminHeader() {
  const [isOpen, setOpen] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [avtUrl, setAvtUrl] = useState(accessToken.avatarURL);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    navigate("/"); // điều hướng sau khi xóa token
  };
  const { avatar } = useAvatar();
  return (
    <>
      <div className="header-search">
        <Search />
        <input type="text" placeholder="Search for somthing..." />
      </div>
      <div className="right-part">
        <div className="notiBell">
          <Notifications className="bell-icon" />
        </div>
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
          <span className="nameAdmin">{accessToken?.userName}</span>
          <ArrowDropDown />
          {isOpen && (
            <div className="dropdownAccount">
              <ul>
                <a href="/">
                  <li>
                    <Person />
                    <span>Blog</span>
                  </li>
                </a>

                <a href="/admin/manager-profile">
                  <li>
                    <Person />
                    <span>Trang cá nhân</span>
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
      </div>
    </>
  );
}
