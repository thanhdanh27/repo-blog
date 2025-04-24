import React, { useEffect, useState } from "react";
import "./Home.scss";
import CrumBoard from "../../components/CrumBoard";
import ListPost from "../../components/ListPost";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../constant";

export default function HomePage({ data }) {
  return (
    <div className="home-container">
      <CrumBoard />

      <ListPost data={data} />
    </div>
  );
}
