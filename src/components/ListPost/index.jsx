import { Grid } from "@mui/material";
import "./ListPost.scss";
import PostCard from "../PostCard";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import { useEffect, useState } from "react";

export default function ListPost({ data }) {
  return (
    <div className="listPost-wrap">
      <Grid container spacing={4}>
        {data.map((item, index) => {
          return (
            <Grid key={index} item xs={4} sx={{ maxWidth: 390 }}>
              <PostCard data={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
