import { Grid } from "@mui/material";
import "./ListPost.scss";
import PostCard from "../PostCard";

export default function ListPost() {
  return (
    <div className="listPost-wrap">
      <Grid container spacing={4}>
        <Grid item xs={4} sx={{ maxWidth: 390 }}>
          <PostCard />
        </Grid>
        <Grid item xs={4} sx={{ maxWidth: 390 }}>
          <PostCard />
        </Grid>
        <Grid item xs={4} sx={{ maxWidth: 390 }}>
          <PostCard />
        </Grid>
        <Grid item xs={4} sx={{ maxWidth: 390 }}>
          <PostCard />
        </Grid>
        <Grid item xs={4} sx={{ maxWidth: 390 }}>
          <PostCard />
        </Grid>
      </Grid>
    </div>
  );
}
