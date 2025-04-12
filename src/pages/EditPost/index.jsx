import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditPost.scss";
import {
  Add,
  CalendarMonth,
  Flag,
  PlusOne,
  Public,
  Save,
  Visibility,
} from "@mui/icons-material";

export default function EditPost() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="titlePost-wrap">
        <span>Blog Posts</span>
        <h3>Add New Post</h3>
      </div>

      <div className="edit-container">
        <div className="boxEdit-wrap">
          <div className="title-input">
            <input type="text" placeholder="Your Post Title" />
          </div>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
        <div className="infoPost-wrap">
          <div className="actionsBox">
            <span className="titleBox">Actions</span>
            <ul>
              <li className="itemActions">
                <div className="infoActionItem">
                  <Flag />
                  <span style={{ color: "#5a6169", fontWeight: "600" }}>
                    Status:
                  </span>
                  <span style={{ fontWeight: "350" }}>Draf</span>
                </div>
                <a href="#">Edit</a>
              </li>

              <li className="itemActions">
                <div className="infoActionItem">
                  <Visibility />
                  <span style={{ color: "#5a6169", fontWeight: "600" }}>
                    Visibility:
                  </span>
                  <span
                    style={{
                      fontWeight: "350",
                      color: "#17C671",
                      fontWeight: "600",
                    }}
                  >
                    Public
                  </span>
                </div>
                <a href="#">Edit</a>
              </li>

              <li className="itemActions">
                <div className="infoActionItem">
                  <CalendarMonth />
                  <span style={{ color: "#5a6169", fontWeight: "600" }}>
                    Schedule:
                  </span>
                  <span style={{ fontWeight: "350" }}>Now</span>
                </div>
                <a href="#">Edit</a>
              </li>
            </ul>
            <div className="actions-btn">
              <div className="actionBoxItem save">
                <Save />
                <span>Save Draft</span>
              </div>
              <div className="actionBoxItem public">
                <Public />
                <span>Public</span>
              </div>
            </div>
          </div>
          <div className="actionsBox category">
            <span className="titleBox">Categories</span>
            <div className="listTag-wrap">
              <ul>
                <li className="itemTag">
                  <input type="checkbox" />
                  <span>Example</span>
                </li>

                <li className="itemTag">
                  <input type="checkbox" />
                  <span>Example</span>
                </li>

                <li className="itemTag">
                  <input type="checkbox" />
                  <span>Example</span>
                </li>
              </ul>
              <div className="addTags-wrap">
                <div className="inputTag">
                  <input type="text" placeholder="Add new Tags" />
                </div>
                <div className="add-icon">
                  <Add />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
