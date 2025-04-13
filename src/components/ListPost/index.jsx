import { Grid } from "@mui/material";
import "./ListPost.scss";
import PostCard from "../PostCard";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import { useEffect, useState } from "react";

export default function ListPost({ data }) {
  // const baseApi = BACKEND_URL;
  // const [posts, setPosts] = useState([]);
  // const getPosts = async () => {
  //   try {
  //     const response = await axios.get(`${baseApi}/Post`);
  //     console.log("Danh sách bài viết:", response.data);
  //     return response.data; // Trả về để sử dụng nơi khác
  //   } catch (error) {
  //     console.error(
  //       "Lỗi khi lấy bài viết:",
  //       error.response?.data || error.message
  //     );
  //     return []; // Trả mảng rỗng nếu lỗi
  //   }
  // };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await getPosts();
  //     setPosts(data);
  //   };
  //   fetchPosts();
  // }, []);

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
