import React, { useEffect, useRef, useState } from "react";
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
import { BACKEND_URL } from "../../constant";
import axios from "axios";

export default function EditPost() {
  // const [value, setValue] = useState("");
  // const [title, setTitle] = useState("");
  const UPLOAD_PRESET = "upload_public";
  const CLOUD_NAME = "djwz3immr"; // lấy từ tên tài khoản cloud của bạn
  const quillRef = useRef(null);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const baseApi = BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: accessToken.userId,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // Trả về link ảnh công khai
  };

  useEffect(() => {
    const quill = quillRef.current.getEditor();
    const editor = quill.root;

    const handlePaste = async (e) => {
      const clipboardItems = e.clipboardData.items;

      // Check xem có ảnh trong clipboard không
      let hasImage = false;
      for (const item of clipboardItems) {
        if (item.type.indexOf("image") !== -1) {
          hasImage = true;
          break;
        }
      }

      if (hasImage) {
        // CHẶN hành vi mặc định NGAY LẬP TỨC
        e.preventDefault();

        for (const item of clipboardItems) {
          if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();

            // 1. Upload ảnh lên Cloudinary
            const imageUrl = await uploadToCloudinary(file);

            // 2. Insert ảnh vào editor
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", imageUrl);
            quill.setSelection(range.index + 1); // <- di chuyển con trỏ sau ảnh
          }
        }
      }
    };

    editor.addEventListener("paste", handlePaste);
    return () => editor.removeEventListener("paste", handlePaste);
  }, []);

  const isContentEmpty = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent.trim() === "";
  };

  const handleUploadPost = async () => {
    if (!formData.title.trim() || isContentEmpty(formData.content)) {
      console.log("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    try {
      const response = await axios.post(`${baseApi}/Post`, formData);
      console.log("Đăng bài thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error.response?.data || error.message);
    }
  };
  console.log(formData.content);

  return (
    <>
      <div className="titlePost-wrap">
        <span>Blog Posts</span>
        <h3>Add New Post</h3>
      </div>

      <div className="edit-container">
        <div className="boxEdit-wrap">
          <div className="title-input">
            <input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              type="text"
              placeholder="Your Post Title"
            />
          </div>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
          />
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
              <div onClick={handleUploadPost} className="actionBoxItem public">
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
