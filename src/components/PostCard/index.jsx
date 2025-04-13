import { Link } from "react-router-dom";
import "./PostCard.scss";
export default function PostCard({ data }) {
  const createdAt = data.createdAt;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("vi-VN"); // → "13/4/2025"
  return (
    <Link to={`/post/${data.postId}`}>
      <div className="postcard-wrap">
        <div className="img-wrap">
          <img
            src="https://ps.w.org/mhm-list-postthumbnail/assets/banner-1544x500.png?rev=2463748"
            alt="img"
          />
        </div>
        <div className="content-card">
          <p className="title-card">{data.title}</p>
          {/* <span>Tìm hiểu cách tạo đường cắt thích ứng bằng CSS.</span> */}
          <ul className="listTag">
            <li>Html</li>
            <li>Css</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="infoPost">
          <span>{data.authorId}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
