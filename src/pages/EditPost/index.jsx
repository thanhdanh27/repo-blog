import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditPost.scss";
import {
  Add,
  CalendarMonth,
  FileUpload,
  Flag,
  PlusOne,
  Public,
  Save,
  Visibility,
} from "@mui/icons-material";
import { BACKEND_URL } from "../../constant";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import deleteIcon from "../../assets/deleteIcon.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditPost() {
  const currencies = [
    {
      value: "Post",
      label: "Post",
    },
    {
      value: "ProjectSource",
      label: "ProjectSource",
    },
  ];

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const hasToken = !!accessToken;
  useEffect(() => {
    if (!hasToken) navigate("/auth/signup");
  }, [hasToken, navigate]);

  const { postId } = useParams(); // id sẽ có khi đang edit
  const isEdit = Boolean(postId); // nếu có id nghĩa là đang edit

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${baseApi}/Post/${postId}`)
        .then((res) => {
          const data = res.data;
          // setTags([...tags, ...data.categories.map((category) => category)]);
          setFormData({
            title: data.title,
            content: data.content,
            author: {
              userId: data?.author?.userId,
              userName: data?.author?.userName,
            },
            categories: data.categories || [],
            thumbailURL: data.thumbailURL,
            sourceURL: data.sourceURL,
            type: data.type,
            price: data.price,
          });
        })
        .catch((err) => {
          console.error("Lỗi lấy dữ liệu:", err);
        });
    }
  }, [postId]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningsAlert, setShowWarningAlert] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${baseApi}/Category`);
      setTags(response.data);
      console.log(response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const UPLOAD_PRESET = "upload_public";
  const CLOUD_NAME = "djwz3immr"; // lấy từ tên tài khoản cloud của bạn
  const quillRef = useRef(null);
  const inputRef = useRef(null); // Tạo ref cho input

  const baseApi = BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: {
      userId: accessToken?.userId,
      userName: accessToken?.userName,
    },
    categories: [],
    thumbailURL: "",
    type: "",
    sourceURL: "",
    price: 0,
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
      setShowWarningAlert(true);
      setTimeout(() => {
        setShowWarningAlert(false);
      }, 2000);
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

        setFormData({
          title: "",
          content: "",
          author: {
            userId: accessToken?.userId,
            userName: accessToken?.userName,
          },
          categories: [],
          thumbailURL: "",
          type: "",
          sourceURL: "",
          price: "",
        });
        setTags([]);
        inputRef.current.focus();
      }
      // 👉 Show success alert
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);

      // Sau khi thành công, bạn có thể redirect, toast, reset form, etc.
    } catch (error) {
      console.error("Lỗi khi gửi bài:", error.response?.data || error.message);
    }
  };

  const onReload = async () => {
    const data = await fetchTags();
    setTags(data);
  };

  const deletePost = async (id) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat.categoryId !== id),
    }));

    try {
      const response = await axios.delete(`${baseApi}/Category/${id}`);
      console.log("Xoá thành công:", response.data);
      onReload();
    } catch (error) {
      console.error("Lỗi khi xoá:", error.response?.data || error.message);
    }
  };

  const handleAddTag = async () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      try {
        const res = await axios.post(`${baseApi}/Category`, {
          categoryName: trimmedValue,
        });

        // Thành công
        setTags([...tags, { categoryName: trimmedValue }]);
        setInputValue("");
      } catch (err) {
        console.error("Gửi tag thất bại:", err);
      }
    }
  };

  const handleCategoryToggle = async (tagName, isChecked) => {
    if (isChecked) {
      try {
        // Gọi API GET sau khi tick để lấy ID theo tên
        const res = await axios.get(`${baseApi}/Category`);
        const allCategories = res.data;
        // console.log(allCategories);

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoader(true);

    try {
      const response = await axios.post(
        `${baseApi}/File/UploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoader(false);

      console.log("Upload thành công:", response.data.imageURL);
      const uploadedURL = response.data.imageURL;

      setFormData((prev) => ({
        ...prev,
        thumbailURL: uploadedURL,
      }));
    } catch (error) {
      console.error("Lỗi khi upload:", error);
    }
  };
  // console.log("formData:", formData);
  // console.log(tags);

  return (
    <>
      <div style={{ height: "50px" }}>
        {showWarningsAlert && (
          <Alert severity="warning">
            Vui lòng nhập đầy đủ tiêu đề và nội dung!
          </Alert>
        )}

        {showSuccessAlert && (
          <Alert severity="success">
            {isEdit
              ? "Đã cập nhật bài viết thành công !"
              : "Đã đăng tải bài viết thành công !"}
          </Alert>
        )}
      </div>

      <div className="titlePost-wrap">
        <span>Blog Posts</span>
        <h3>Thêm vài viết mới</h3>
        <div className="uploadAvt-wrap">
          <div className="changeAvt">
            <div className="avt-border">
              {loader ? (
                <div
                  className="wrapLoader"
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : null}

              <img
                src={
                  formData.thumbailURL
                    ? formData.thumbailURL
                    : "https://www.lioncare.co.uk/wordpress/wp-content/themes/evolve-plus/assets/images/no-thumbnail.jpg"
                }
                alt="avt"
              />
            </div>

            <Button
              className="btn-upload-avt"
              variant="outlined"
              sx={{ padding: "0" }}
            >
              <label
                style={{
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  padding: "0.5rem 1rem",
                  width: "100%",
                  justifyContent: "center",
                }}
                htmlFor="upload-photo"
              >
                <p> Tải ảnh bìa lên Tải ảnh bìa lên</p>
                <FileUpload />
              </label>
            </Button>
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="typePost">
            <TextField
              className="srcPost"
              id="outlined-basic"
              label="Source"
              variant="outlined"
              value={formData.sourceURL}
              onChange={(e) => handleChange("sourceURL", e.target.value)}
            />
            <TextField
              className="pricePost"
              id="outlined-number"
              onChange={(e) => handleChange("price", +e.target.value)}
              label="Giá"
              type="number"
              value={formData.price}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              className="type"
              id="outlined-select-currency"
              select
              label="Phân loại"
              value={formData.type}
            >
              {currencies.map((option) => (
                <MenuItem
                  className="item-type"
                  onClick={() => {
                    handleChange("type", option.value);
                  }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>

      <div className="edit-container">
        <div className="boxEdit-wrap">
          <div className="title-input">
            <input
              ref={inputRef}
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              type="text"
              placeholder="Tiêu đề bài viết"
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
            <span className="titleBox">Hành động</span>
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
              <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Mở bảng phân loại
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Chọn phân loại"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <ul>
                        {tags?.map((item, index) => {
                          if (item.categoryId !== "67fd43e0d84b48830ccc0e22") {
                            return (
                              <li key={index} className="itemTag">
                                <div>
                                  <input
                                    checked={formData?.categories?.some(
                                      (cat) =>
                                        cat.categoryName === item.categoryName
                                    )}
                                    onChange={(e) =>
                                      handleCategoryToggle(
                                        item.categoryName,
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <span style={{ marginLeft: "7px" }}>
                                    {item.categoryName}
                                  </span>
                                </div>

                                <span
                                  onClick={() => {
                                    deletePost(item.categoryId);
                                  }}
                                >
                                  <img
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    src={deleteIcon}
                                    width="20px"
                                    height="20px"
                                    alt="icon"
                                  />
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                    <Button onClick={handleClose} autoFocus>
                      Đóng
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div onClick={handleUploadPost}>
                <Button variant="contained">
                  <Public />
                  {isEdit ? "Cập nhật" : "Đăng bài"}
                </Button>
              </div>
            </div>
          </div>
          <div className="actionsBox category">
            <span className="titleBox">Thêm phân loại</span>
            <div className="listTag-wrap">
              <div className="addTags-wrap">
                <div className="inputTag">
                  <input
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    type="text"
                    placeholder="Thêm tag mới"
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
