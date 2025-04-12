import React from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function UserLayout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-content">{children}</div>
      <Footer />
    </div>
  );
}
