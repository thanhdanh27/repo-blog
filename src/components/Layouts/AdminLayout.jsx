import React from "react";
import AdminHeader from "../AdminHeader";
import FooterAdmin from "../FooterAdmin";
import AdminHome from "../../pages/AdminHome";
import SidebarAdmin from "../SidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <SidebarAdmin />
      </div>
      <div className="main">
        <div className="headerAdmin">
          <AdminHeader />
        </div>
        <div className="contentAdmin">{children}</div>
        <div className="footerAdmin">
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
