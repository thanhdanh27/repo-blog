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
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { postId } = useParams(); // id sẽ có khi đang edit
  const isEdit = Boolean(postId); // nếu có id nghĩa là đang edit
  // console.log(isEdit);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${baseApi}/Post/${postId}`)
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          setTags(data.categories.map((category) => category.categoryName));
          setFormData({
            title: data.title,
            content: data.content,
            author: {
              userId: data.author.userId,
              userName: data.author.userName,
            },
            categories: data.categories || [],
          });
        })
        .catch((err) => {
          console.error("Lỗi lấy dữ liệu:", err);
        });
    }
  }, [postId]);

  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleAddTag = async () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      try {
        const res = await axios.post(`${baseApi}/Category`, {
          categoryName: trimmedValue,
        });

        // Thành công
        setTags([...tags, trimmedValue]);
        setInputValue("");
      } catch (err) {
        console.error("Gửi tag thất bại:", err);
      }
    }
  };

  const UPLOAD_PRESET = "upload_public";
  const CLOUD_NAME = "djwz3immr"; // lấy từ tên tài khoản cloud của bạn
  const quillRef = useRef(null);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const baseApi = BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: {
      userId: accessToken.userId,
      userName: accessToken.userName,
    },
    categories: [],
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
      let response;
      let dataToSend = { ...formData };

      if (isEdit) {
        // Gọi API cập nhật
        dataToSend = { ...formData, postId: postId }; // Thêm postId khi cập nhật
        response = await axios.put(`${baseApi}/Post/${postId}`, dataToSend);
        console.log("Cập nhật bài viết thành công:", response.data);
      } else {
        // Gọi API đăng bài mới
        response = await axios.post(`${baseApi}/Post`, formData);
        console.log("Đăng bài mới thành công:", response.data);
      }

      // Sau khi thành công, bạn có thể redirect, toast, reset form, etc.
    } catch (error) {
      console.error("Lỗi khi gửi bài:", error.response?.data || error.message);
    }
  };

  const handleCategoryToggle = async (tagName, isChecked) => {
    if (isChecked) {
      try {
        // Gọi API GET sau khi tick để lấy ID theo tên
        const res = await axios.get(`${baseApi}/Category`);
        const allCategories = res.data;
        console.log(allCategories);

        // Tìm tag theo tên
        const found = allCategories.find((cat) => cat.categoryName === tagName);

        if (found) {
          setFormData((prev) => ({
            ...prev,
            categories: [
              ...prev.categories,
              {
                categoryId: found.categoryId,
                categoryName: found.categoryName,
              },
            ],
          }));
        } else {
          console.warn(`Không tìm thấy category có tên: ${tagName}`);
        }
      } catch (err) {
        console.error("Lỗi khi gọi GET categories:", err);
      }
    } else {
      // Bỏ tick thì xoá khỏi formData
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.filter(
          (cat) => cat.categoryName !== tagName
        ),
      }));
    }
  };
  console.log(formData);
  // console.log(tags);

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
                <span>{isEdit ? "Update" : "Public"}</span>
              </div>
            </div>
          </div>
          <div className="actionsBox category">
            <span className="titleBox">Categories</span>
            <div className="listTag-wrap">
              <ul>
                {tags.map((item, index) => {
                  return (
                    <li key={index} className="itemTag">
                      <input
                        checked={formData.categories.some(
                          (cat) => cat.categoryName === item
                        )}
                        onChange={(e) =>
                          handleCategoryToggle(item, e.target.checked)
                        }
                        type="checkbox"
                      />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="addTags-wrap">
                <div className="inputTag">
                  <input
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    type="text"
                    placeholder="Add new Tags"
                  />
                </div>
                <div onClick={handleAddTag} className="add-icon">
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
