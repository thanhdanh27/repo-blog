import React from "react";
import "./Footer.scss";
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <Grid container>
        <Grid size={4}>
          <ul className="listFooter">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: 500,
                marginBottom: "1rem",
                display: "block",
              }}
            >
              Đóng góp
            </span>
            <li>Báo cáo lỗi</li>
            <li>Xem các sự cố mở</li>
          </ul>
        </Grid>
        <Grid size={4}>
          <ul className="listFooter">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: 500,
                marginBottom: "1rem",
                display: "block",
              }}
            >
              Đóng góp
            </span>
            <li>Nội dung liên quan</li>
            <li>Bản cập nhật Chromium</li>
            <li>Nghiên cứu điển hình</li>
            <li>Podcast và chương trình</li>
          </ul>
        </Grid>
        <Grid size={4}>
          <ul className="listFooter">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: 500,
                marginBottom: "1rem",
                display: "block",
              }}
            >
              Theo dõi
            </span>
            <li>@ChromiumDev trên X</li>
            <li>Chrome dành cho nhà phát triển trên LinkedIn</li>
            <li>YouTube</li>
            <li>RSS</li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}
