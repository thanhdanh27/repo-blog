import {
  ArrowDropDown,
  Login,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import "./AdminHeader.scss";
import { useState } from "react";

export default function AdminHeader() {
  const [isOpen, setOpen] = useState(false);
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
              src="https://designrevision.com/demo/shards-dashboard-react/static/media/0.73476783.jpg"
              alt="avt"
            />
          </div>
          <span className="nameAdmin">Viet Nguyen</span>
          <ArrowDropDown />
          {isOpen && (
            <div className="dropdownAccount">
              <ul>
                <li>
                  <Person />
                  <span>Profile</span>
                </li>
                <li>
                  <Person />
                  <span>Profile</span>
                </li>
                <li>
                  <Person />
                  <span>Profile</span>
                </li>
                <li>
                  <Person />
                  <span>Profile</span>
                </li>
                <li>
                  <Person />
                  <span>Profile</span>
                </li>
                <li className="logout-btn">
                  <a href="#">
                    <Login />
                    <span>Logout</span>
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
