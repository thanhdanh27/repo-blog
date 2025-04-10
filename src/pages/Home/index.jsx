import React from "react";
import "./Home.scss";
import CrumBoard from "../../components/CrumBoard";
import ListPost from "../../components/ListPost";

export default function HomePage() {
  return (
    <div className="home-container">
      <CrumBoard />
      <ListPost />
    </div>
  );
}
