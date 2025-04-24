import { Link } from "react-router-dom";
import "./PostCard.scss";
export default function PostCard({ data }) {
  // console.log(data);
  const createdAt = data.createdAt;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("vi-VN"); // → "13/4/2025"
  return (
    <Link to={`/post/${data.postId}`}>
      <div className="postcard-wrap">
        <div className="img-wrap">
          <img
            src={
              data?.thumbailURL
                ? data.thumbailURL
                : "https://ps.w.org/mhm-list-postthumbnail/assets/banner-1544x500.png?rev=2463748"
            }
            alt="img"
          />
        </div>
        <div className="content-card">
          <p className="title-card">{data.title}</p>
          {/* <span>Tìm hiểu cách tạo đường cắt thích ứng bằng CSS.</span> */}
          <div
            className="postRender clamp-3-lines"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          <ul className="listTag">
            {data.categories.map((item, index) => {
              return <li key={index}>{item.categoryName}</li>;
            })}
          </ul>
        </div>
        <div className="infoPost">
          <span>{data.author.userName}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
