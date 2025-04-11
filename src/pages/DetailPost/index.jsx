import {
  ArrowDropDown,
  ArrowForwardIos,
  GitHub,
  LinkedIn,
  TurnedIn,
} from "@mui/icons-material";
import "./DetailPost.scss";

export default function DetailPost() {
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
              <span>tagNamePost</span>
            </div>
            <div className="titlePost-wrap">
              <h1 className="titlePost">
                Thanh bên Thông tin chi tiết trong bảng điều khiển Hiệu suất của
                Công cụ cho nhà phát triển &nbsp;
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
                <span>Thanh Viet</span>
                <div className="socialAuthor">
                  <GitHub className="social-icon" />
                  <LinkedIn className="social-icon" />
                </div>
              </div>
            </div>
            <div className="datePublished">
              <span>Ngày xuất bản: 2 tháng 4 năm 2025</span>
            </div>
            <div className="postRender">
              <p>
                Có thể bạn đã nhận thấy thanh bên mới được thêm vào Chrome 131
                cùng với một số thông tin chi tiết ban đầu và đã có thêm thông
                tin chi tiết trong mỗi bản phát hành Chrome mới kể từ đó. Để xem
                video, hãy nhấn vào radio_button_checked Record (Ghi) trong bảng
                điều khiển Performance (Hiệu suất), tải một URL hoặc tương tác
                với một trang, sau đó dừng ghi. Thanh bên có thể được thu gọn
                sang bên trái của bảng điều khiển Hiệu suất nếu bạn đã đóng
                thanh bên đó trước đây. Để hiển thị bảng điều khiển này, hãy
                nhấp vào nút left_panel_open. Bạn sẽ thấy danh sách thông tin
                chi tiết đóng vai trò là điểm truy cập để điều tra các vấn đề về
                hiệu suất. Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê
                một tập hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác
                định các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc
                cung cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở
                dưới cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn).
                Phần này chứa những thông tin chi tiết không được xác định là có
                vấn đề đối với bản ghi này, cho dù là do không xảy ra vấn đề
                hiệu suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp
                dụng được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với
                trang và không di chuyển). Có thể bạn đã nhận thấy thanh bên mới
                được thêm vào Chrome 131 cùng với một số thông tin chi tiết ban
                đầu và đã có thêm thông tin chi tiết trong mỗi bản phát hành
                Chrome mới kể từ đó. Để xem video, hãy nhấn vào
                radio_button_checked Record (Ghi) trong bảng điều khiển
                Performance (Hiệu suất), tải một URL hoặc tương tác với một
                trang, sau đó dừng ghi. Thanh bên có thể được thu gọn sang bên
                trái của bảng điều khiển Hiệu suất nếu bạn đã đóng thanh bên đó
                trước đây. Để hiển thị bảng điều khiển này, hãy nhấp vào nút
                left_panel_open. Bạn sẽ thấy danh sách thông tin chi tiết đóng
                vai trò là điểm truy cập để điều tra các vấn đề về hiệu suất.
                Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê một tập
                hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác định
                các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc cung
                cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở dưới
                cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn). Phần
                này chứa những thông tin chi tiết không được xác định là có vấn
                đề đối với bản ghi này, cho dù là do không xảy ra vấn đề hiệu
                suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp dụng
                được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với trang
                và không di chuyển).
              </p>
              <br />
              <p>
                Có thể bạn đã nhận thấy thanh bên mới được thêm vào Chrome 131
                cùng với một số thông tin chi tiết ban đầu và đã có thêm thông
                tin chi tiết trong mỗi bản phát hành Chrome mới kể từ đó. Để xem
                video, hãy nhấn vào radio_button_checked Record (Ghi) trong bảng
                điều khiển Performance (Hiệu suất), tải một URL hoặc tương tác
                với một trang, sau đó dừng ghi. Thanh bên có thể được thu gọn
                sang bên trái của bảng điều khiển Hiệu suất nếu bạn đã đóng
                thanh bên đó trước đây. Để hiển thị bảng điều khiển này, hãy
                nhấp vào nút left_panel_open. Bạn sẽ thấy danh sách thông tin
                chi tiết đóng vai trò là điểm truy cập để điều tra các vấn đề về
                hiệu suất. Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê
                một tập hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác
                định các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc
                cung cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở
                dưới cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn).
                Phần này chứa những thông tin chi tiết không được xác định là có
                vấn đề đối với bản ghi này, cho dù là do không xảy ra vấn đề
                hiệu suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp
                dụng được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với
                trang và không di chuyển). Có thể bạn đã nhận thấy thanh bên mới
                được thêm vào Chrome 131 cùng với một số thông tin chi tiết ban
                đầu và đã có thêm thông tin chi tiết trong mỗi bản phát hành
                Chrome mới kể từ đó. Để xem video, hãy nhấn vào
                radio_button_checked Record (Ghi) trong bảng điều khiển
                Performance (Hiệu suất), tải một URL hoặc tương tác với một
                trang, sau đó dừng ghi. Thanh bên có thể được thu gọn sang bên
                trái của bảng điều khiển Hiệu suất nếu bạn đã đóng thanh bên đó
                trước đây. Để hiển thị bảng điều khiển này, hãy nhấp vào nút
                left_panel_open. Bạn sẽ thấy danh sách thông tin chi tiết đóng
                vai trò là điểm truy cập để điều tra các vấn đề về hiệu suất.
                Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê một tập
                hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác định
                các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc cung
                cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở dưới
                cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn). Phần
                này chứa những thông tin chi tiết không được xác định là có vấn
                đề đối với bản ghi này, cho dù là do không xảy ra vấn đề hiệu
                suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp dụng
                được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với trang
                và không di chuyển).
              </p>
              <br />
              <p>
                Có thể bạn đã nhận thấy thanh bên mới được thêm vào Chrome 131
                cùng với một số thông tin chi tiết ban đầu và đã có thêm thông
                tin chi tiết trong mỗi bản phát hành Chrome mới kể từ đó. Để xem
                video, hãy nhấn vào radio_button_checked Record (Ghi) trong bảng
                điều khiển Performance (Hiệu suất), tải một URL hoặc tương tác
                với một trang, sau đó dừng ghi. Thanh bên có thể được thu gọn
                sang bên trái của bảng điều khiển Hiệu suất nếu bạn đã đóng
                thanh bên đó trước đây. Để hiển thị bảng điều khiển này, hãy
                nhấp vào nút left_panel_open. Bạn sẽ thấy danh sách thông tin
                chi tiết đóng vai trò là điểm truy cập để điều tra các vấn đề về
                hiệu suất. Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê
                một tập hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác
                định các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc
                cung cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở
                dưới cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn).
                Phần này chứa những thông tin chi tiết không được xác định là có
                vấn đề đối với bản ghi này, cho dù là do không xảy ra vấn đề
                hiệu suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp
                dụng được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với
                trang và không di chuyển). Có thể bạn đã nhận thấy thanh bên mới
                được thêm vào Chrome 131 cùng với một số thông tin chi tiết ban
                đầu và đã có thêm thông tin chi tiết trong mỗi bản phát hành
                Chrome mới kể từ đó. Để xem video, hãy nhấn vào
                radio_button_checked Record (Ghi) trong bảng điều khiển
                Performance (Hiệu suất), tải một URL hoặc tương tác với một
                trang, sau đó dừng ghi. Thanh bên có thể được thu gọn sang bên
                trái của bảng điều khiển Hiệu suất nếu bạn đã đóng thanh bên đó
                trước đây. Để hiển thị bảng điều khiển này, hãy nhấp vào nút
                left_panel_open. Bạn sẽ thấy danh sách thông tin chi tiết đóng
                vai trò là điểm truy cập để điều tra các vấn đề về hiệu suất.
                Tương tự như báo cáo Lighthouse, thanh bên sẽ liệt kê một tập
                hợp thông tin chi tiết về bản ghi bạn vừa thực hiện, xác định
                các vấn đề về hiệu suất hoặc trải nghiệm người dùng hoặc cung
                cấp dữ liệu để giúp bạn tự lọc và chẩn đoán các vấn đề. Ở dưới
                cùng là phần Thông tin chi tiết đã vượt qua (đã thu gọn). Phần
                này chứa những thông tin chi tiết không được xác định là có vấn
                đề đối với bản ghi này, cho dù là do không xảy ra vấn đề hiệu
                suất cụ thể hay thông tin chi tiết đó hoàn toàn không áp dụng
                được (ví dụ: nếu bạn đã theo dõi hoạt động tương tác với trang
                và không di chuyển).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
