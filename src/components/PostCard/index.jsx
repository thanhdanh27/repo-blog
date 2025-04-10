import "./PostCard.scss";
export default function PostCard() {
  return (
    <div className="postcard-wrap">
      <div className="img-wrap">
        <img
          src="https://developer.chrome.com/static/blog/css-shape/image/hero.png?hl=vi&dcb_=0.8405093293772826"
          alt="img"
        />
      </div>
      <div className="content-card">
        <p className="title-card"> Sử dụng shape() để cắt hình ảnh thích ứng</p>
        <span>Tìm hiểu cách tạo đường cắt thích ứng bằng CSS.</span>
        <ul className="listTag">
          <li>Html</li>
          <li>Css</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className="infoPost">
        <span>Noam Rosenthal</span>
        <span>8 tháng 4, 2025</span>
      </div>
    </div>
  );
}
