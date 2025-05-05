import React, { useState } from "react";
import "./Shop.scss";
import {
  Autocomplete,
  Box,
  Grid,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import { AddShoppingCart, Close, IosShare } from "@mui/icons-material";

export default function ShopPage({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [post, setPost] = useState([]);

  console.log(post);

  return (
    <div className="shop-container">
      <Modal open={open} onClose={handleClose}>
        <div className="boxModal">
          <div className="headerBox">
            <Close
              onClick={handleClose}
              style={{
                fontSize: "20px",
                cursor: "pointer",
                marginLeft: "15px",
              }}
            />
            <div className="btn-share">
              <span>
                <IosShare style={{ marginRight: "5px", fontSize: "16px" }} />
                Share
              </span>
            </div>
          </div>
          <div className="contentBox">
            <div className="box">
              <div style={{ height: "380px", padding: "30px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  src={
                    post?.thumbailURL
                      ? post.thumbailURL
                      : "https://ps.w.org/mhm-list-postthumbnail/assets/banner-1544x500.png?rev=2463748"
                  }
                  alt="avt"
                />
              </div>
              <div className="boxInfo">
                <div style={{ paddingRight: "15px" }}>
                  <p>{post.title}</p>
                </div>
                <div className="boxPrice">
                  <span style={{ fontSize: "2rem", fontWeight: "600" }}>
                    $45
                  </span>
                  <br />
                  <span
                    style={{
                      fontWeight: "600",
                      margin: "7px 0",
                      display: "block",
                    }}
                  >
                    Enter a fair price
                  </span>
                  <div>
                    <div
                      style={{
                        border: "1px solid #333",
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "6px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.7rem",
                          lineHeight: "15px",
                          fontWeight: "700",
                        }}
                      >
                        $
                      </h3>
                      <input type="number" placeholder="45" />
                    </div>
                    <div
                      className="btn-buy"
                      style={{
                        backgroundColor: "#5f7fff",
                        borderRadius: "20px",
                        padding: "10px",
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "600",
                        marginTop: "15px",
                        cursor: "pointer",
                      }}
                    >
                      Mua
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="box-post">
        <h2>Shop</h2>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid key={index} size={4}>
              <div
                onClick={() => {
                  setPost(item);
                  handleOpen();
                }}
                className="item-post"
              >
                <div className="wrap-btn-cart">
                  <Tooltip
                    slotProps={{
                      tooltip: {
                        sx: {
                          fontSize: "12px",
                          backgroundColor: "#333",
                          fontWeight: "600",
                        },
                      },
                    }}
                    title="Thêm"
                    placement="top"
                  >
                    <div className="btn-cart">
                      <AddShoppingCart sx={{ fontSize: 20 }} />
                    </div>
                  </Tooltip>
                </div>

                <div className="wrap-img">
                  <img
                    src={
                      item?.thumbailURL
                        ? item.thumbailURL
                        : "https://ps.w.org/mhm-list-postthumbnail/assets/banner-1544x500.png?rev=2463748"
                    }
                    alt="img"
                  />
                </div>
                <div className="wrap-infoPost">
                  <p>{item.title}</p>
                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "10px",
                      fontSize: "1.6rem",
                    }}
                  >
                    $45
                  </p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* <ListPost data={data} /> */}
    </div>
  );
}
