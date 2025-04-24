import React from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function UserLayout({ children, onFilterChange }) {
  return (
    <div className="app-layout">
      <Header onFilterChange={onFilterChange} />
      <div className="app-content">{children}</div>
      <Footer />
    </div>
  );
}
