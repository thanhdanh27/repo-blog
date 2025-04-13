import {
  ArrowDropDown,
  ArrowForwardIos,
  GitHub,
  LinkedIn,
  TurnedIn,
} from "@mui/icons-material";
import "./DetailPost.scss";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constant";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPost() {
  const { postId } = useParams();

  const baseApi = BACKEND_URL;
  const [post, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseApi}/Post/${postId}`);
      // console.log("Danh sách bài viết chi tiết:", response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error(
        "Lỗi khi lấy bài viết chi tiết:",
        error.response?.data || error.message
      );
      return []; // Trả mảng rỗng nếu lỗi
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const createdAt = post.createdAt;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("vi-VN"); // → "13/4/2025"

  return (
    <div className="detailPost-wrap">
      <div className="crumboad-wrap">
        <p>Blog</p>
      </div>
      <div className="boxContent-wrap">
        <div className="box-content">
          <div className="header-box"></div>

          <div className="boxShowContent">
            <div className="breadCrumb">
              <a href="/">Blog</a>
              <ArrowForwardIos className="arrowForward-icon" />
              <span>{post.postId}</span>
            </div>
            <div className="titlePost-wrap">
              <h1 className="titlePost">
                {post.title} &nbsp;
                <span className="savePost">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TurnedIn className="savePost-icon" />
                    <ArrowDropDown className="savePost-icon" />
                  </div>
                </span>
              </h1>
            </div>
            <div className="authorPost-wrap">
              <div className="circle-img">
                <img
                  src="https://web.dev/images/authors/bckenny.jpg?hl=vi"
                  alt="autor"
                />
              </div>
              <div className="infoAuthor-wrap">
                <span>{post.authorId}</span>
                <div className="socialAuthor">
                  <GitHub className="social-icon" />
                  <LinkedIn className="social-icon" />
                </div>
              </div>
            </div>
            <div className="datePublished">
              <span>Ngày xuất bản: {formattedDate}</span>
            </div>
            {/* <div className="postRender"></div> */}
            {post?.content && (
              <div
                className="postRender"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
