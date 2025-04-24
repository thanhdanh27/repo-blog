import {
  ArrowDropDown,
  ArrowForwardIos,
  GitHub,
  LinkedIn,
  Send,
  TurnedIn,
} from "@mui/icons-material";
import "./DetailPost.scss";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constant";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAvatar } from "../../AvatarContext";
import { Tooltip } from "@mui/material";

export default function DetailPost() {
  const { avatar } = useAvatar();
  const { postId } = useParams();
  const inputRef = useRef(null); // Tạo ref cho input
  const baseApi = BACKEND_URL;
  const [inputComment, setComment] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const hasToken = !!accessToken;

  const [post, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
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

  const getInfoAuthor = async () => {
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

  const getCommentsByPostId = async () => {
    try {
      const response = await axios.get(`${baseApi}/Comment/post/${postId}`);
      // console.log("Danh sách comments bài viết:", response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error(
        "Lỗi khi lấy bài viết:",
        error.response?.data || error.message
      );
      return []; // Trả mảng rỗng nếu lỗi
    }
  };

  const [editingCommentId, setEditingCommentId] = useState(null);
  const handleUpdateCmt = (cmt) => {
    inputRef.current.focus();
    setComment(cmt.commentText);
    setEditingCommentId(cmt.commentId);
  };
  const handleDeleteCmt = async (cmt) => {
    try {
      await axios.delete(`${baseApi}/Comment/${cmt.commentId}`);
      console.log("Xoá comment thành công");

      // Refresh lại danh sách comment sau khi xoá
      const updatedComments = await getCommentsByPostId();
      setComments(updatedComments);
    } catch (error) {
      console.error("Lỗi khi xoá comment:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    const fetchComments = async () => {
      const data = await getCommentsByPostId();
      setComments(data);
    };

    fetchComments();
    fetchPosts();
  }, []);

  const createdAt = post.createdAt;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("vi-VN"); // → "13/4/2025"

  const handleSendCmt = async () => {
    if (!inputComment || inputComment.trim() === "") {
      console.warn("Không thể gửi comment trống.");
      return;
    }
    const commentToSend = {
      commentText: inputComment,
      postId: post?.postId,
      author: {
        userId: accessToken?.userId,
        userName: accessToken?.userName,
      },
    };

    try {
      let response;
      if (editingCommentId) {
        // Thêm id vào commentToSend nếu đang chỉnh sửa
        commentToSend.commentId = editingCommentId;
        // Nếu đang chỉnh sửa, gửi API cập nhật
        response = await axios.put(
          `${baseApi}/Comment/${editingCommentId}`,
          commentToSend
        );
        console.log("Comment updated successfully:", response.data);
      } else {
        // Nếu không chỉnh sửa, gửi API tạo mới
        response = await axios.post(`${baseApi}/Comment`, commentToSend);
        console.log("Comment sent successfully:", response.data);
      }

      // Clear input
      setComment("");

      // Refresh comments
      const updatedComments = await getCommentsByPostId();
      setComments(updatedComments); // Đảo ngược mảng để mới nhất lên trên

      // Reset editing state
      setEditingCommentId(null); // Reset khi hoàn tất việc gửi
    } catch (error) {
      console.error("Error sending comment:", error);
      throw error;
    }
  };

  console.log(post);

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
              <span>{post.title}</span>
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
                  alt="author"
                />
              </div>
              <div className="infoAuthor-wrap">
                <span>{post?.author?.userName}</span>
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
        <div className="box-comment">
          <span style={{ fontWeight: "600", fontSize: "2rem" }}>Bình luận</span>
          {hasToken ? (
            <div className="comment-wrap">
              <div className="img-author-cmt">
                <img
                  src={
                    avatar
                      ? avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  }
                  alt="avt"
                />
              </div>

              <div className="comment-text">
                <input
                  ref={inputRef}
                  value={inputComment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    // setCommentData((prev) => ({
                    //   ...prev,
                    //   commentText: e.target.value,
                    // }));
                  }}
                  type="text"
                  placeholder={`Bình luận dưới tên ${accessToken?.userName}`}
                />
                <span
                  onClick={() => {
                    handleSendCmt();
                  }}
                >
                  <Send className="send-btn" />
                </span>
              </div>
            </div>
          ) : (
            <div>
              <a style={{ textDecoration: "underline" }} href="/auth/signin">
                Đăng nhập để bình luận
              </a>
            </div>
          )}
          <div className="list-comments">
            {[...comments].reverse().map((item, index) => {
              const createdAt = item.createdAt;
              const formattedDate = createdAt
                ? new Date(createdAt).toLocaleString("vi-VN")
                : "Không rõ thời gian";
              return (
                <div key={index} className="comment-item">
                  <div className="img-author-cmt">
                    <img
                      src={
                        item.author.avatarURL
                          ? item.author.avatarURL
                          : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      }
                      alt="avt"
                    />
                  </div>
                  <div>
                    <div className="detail-comment">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <span className="author-name-cmt">
                          {item?.author?.userName}
                        </span>
                        {item?.author?.userName ===
                          "checkervipnhatvietnam666" && (
                          <Tooltip
                            slotProps={{
                              tooltip: {
                                sx: {
                                  fontSize: "1rem",
                                },
                              },
                            }}
                            title="Admin"
                            placement="right-start"
                          >
                            <img
                              src="/verified-badge.png"
                              width="20px"
                              height="20px"
                              alt="Logo"
                            />
                          </Tooltip>
                        )}
                      </div>
                      <p>{item.commentText}</p>
                    </div>
                    <div className="date-cmt">
                      <span>{formattedDate}</span>
                      <span
                        className="like-cmt-btn"
                        style={{ fontWeight: "700", cursor: "pointer" }}
                      >
                        Thích
                      </span>
                      {accessToken?.userId === item?.author?.userId && (
                        <span
                          onClick={() => {
                            handleUpdateCmt(item);
                          }}
                          className="like-cmt-btn"
                          style={{ fontWeight: "700", cursor: "pointer" }}
                        >
                          Chỉnh sửa
                        </span>
                      )}
                      {accessToken?.userId === item?.author?.userId && (
                        <span
                          onClick={() => {
                            handleDeleteCmt(item);
                          }}
                          className="like-cmt-btn"
                          style={{ fontWeight: "700", cursor: "pointer" }}
                        >
                          Xóa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="comment-item">
              <div className="img-author-cmt">
                <img
                  src="https://web.dev/images/authors/bckenny.jpg?hl=vi"
                  alt="avt"
                />
              </div>
              <div>
                <div className="detail-comment">
                  <span className="author-name-cmt">Name</span>
                  <p>
                    Mới có 1 bạn cmt lại ảnh này trong page ổng cũng bị block
                    tiếp. Quá trời cái nết
                  </p>
                </div>
                <div className="date-cmt">
                  <span>date</span>
                  <span
                    className="like-cmt-btn"
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    Thích
                  </span>
                </div>
              </div>
            </div>

            <div className="comment-item">
              <div className="img-author-cmt">
                <img
                  src="https://web.dev/images/authors/bckenny.jpg?hl=vi"
                  alt="avt"
                />
              </div>
              <div>
                <div className="detail-comment">
                  <span className="author-name-cmt">Name</span>
                  <p>
                    Thanh niên nhiều anti nhất nhì VN nhưng không bao giờ thèm
                    block anti, toàn block fan nào trêu 😀 fan thì suốt ngày rủ
                    nhau test trêu xem có bị block không ⛅️
                  </p>
                </div>
                <div className="date-cmt">
                  <span>date</span>
                  <span
                    className="like-cmt-btn"
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    Thích
                  </span>
                </div>
              </div>
            </div>

            <div className="comment-item">
              <div className="img-author-cmt">
                <img
                  src="https://web.dev/images/authors/bckenny.jpg?hl=vi"
                  alt="avt"
                />
              </div>
              <div>
                <div className="detail-comment">
                  <span className="author-name-cmt">Name</span>
                  <p>...</p>
                </div>
                <div className="date-cmt">
                  <span>date</span>
                  <span
                    className="like-cmt-btn"
                    style={{ fontWeight: "700", cursor: "pointer" }}
                  >
                    Thích
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
