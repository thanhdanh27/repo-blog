import { Avatar, Button, CircularProgress, TextField } from "@mui/material";
import "./ManagerProfile.scss";
import { FileUpload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { BACKEND_URL } from "../../constant";
import axios from "axios";

export default function ManagerProfile() {
  const [loader, setLoader] = useState(false);
  const baseApi = BACKEND_URL;
  const [user, setUser] = useState(null);
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const userId = accessToken?.userId;

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoader(true);

    try {
      const response = await axios.post(
        `${baseApi}/User/UploadAvatar/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoader(false);

      console.log("Upload thành công:", response.data.avatarUrl);
      const uploadedURL = response.data.avatarUrl;

      setFormData((prev) => ({
        ...prev,
        avatarURL: uploadedURL,
      }));
    } catch (error) {
      console.error("Lỗi khi upload:", error);
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date.format("YYYY-MM-DD"),
    });
  };

  const [formData, setFormData] = useState({
    userId: accessToken.userId,
    userName: "",
    email: "",
    avatarURL: "",
    dob: null,
  });

  const [formPassword, setFormPassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  // Gọi API lấy thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseApi}/User/username/${accessToken.userName}`
        );
        const userData = response.data;
        // Nếu ngày sinh là "0001-01-01", thay bằng null
        const dob = userData.dob === "0001-01-01" ? null : dayjs(userData.dob);
        setUser(userData);
        setFormPassword({
          email: userData?.email,
        });
        setFormData({
          userId: userData.userId,
          userName: userData.userName || "",
          email: userData.email || "",
          avatarURL: userData.avatarURL,
          dob: dob === null ? dob : dob.format("YYYY-MM-DD"), // Convert từ string sang dayjs
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };

    fetchUser();
  }, [accessToken.userName]);

  const handleSaveInfo = async () => {
    setIsEdit(!isEdit);
    try {
      const response = await axios.put(
        `${baseApi}/User`, // ví dụ API của bạn
        formData
      );

      setFormPassword({
        email: formData.email,
      });

      console.log("Cập nhật user thành công:", response.data);
      accessToken.userName = formData.userName; // Ví dụ thay đổi giá trị key2
      accessToken.avatarURL = formData.avatarURL;

      // Bước 3: Lưu lại accessToken đã cập nhật vào localStorage
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      // Hiển thị thông báo / redirect nếu cần
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);
    }
  };

  const handleUpdatePassword = async () => {
    if (!formPassword.oldPassword && !formPassword.newPassword) {
      setIsEdit2(!isEdit2);
      return;
    }
    try {
      const response = await axios.post(
        `${baseApi}/Auth/ChangePassword`, // ví dụ API của bạn
        formPassword
      );

      setIsEdit2(!isEdit2);
      formPassword.oldPassword = "";
      formPassword.newPassword = "";
      console.log("Cập nhật password thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi update password:", error);
    }
  };

  // console.log(formData);
  console.log(formPassword);

  return (
    <>
      <div className="wrap-border">
        <div className="box-border">
          <p style={{ color: "868e96", fontWeight: "600" }}>
            Setup your general profile details.
          </p>
          <div className="formProfile">
            <div className="fieldInputProfile">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={formData.userName}
                disabled={!isEdit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={formData.email}
                disabled={!isEdit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />

              <LocalizationProvider
                adapterLocale="vi"
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  disabled={!isEdit}
                  value={
                    dayjs(formData.dob).isValid() ? dayjs(formData.dob) : null
                  }
                  onChange={handleDateChange}
                  label="Ngày sinh"
                />
              </LocalizationProvider>
              <TextField
                disabled={!isEdit}
                id="outlined-basic"
                label="Mô tả"
                variant="outlined"
              />
              <Button
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                disabled={isEdit}
                size="large"
                variant="outlined"
              >
                Chỉnh sửa
              </Button>
              {isEdit && (
                <Button
                  onClick={() => {
                    handleSaveInfo();
                  }}
                  variant="contained"
                  size="large"
                >
                  Save Change
                </Button>
              )}
            </div>
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
                      formData.avatarURL
                        ? formData.avatarURL
                        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                    }
                    alt="avt"
                  />
                </div>

                <Button
                  disabled={!isEdit}
                  className="btn-upload-avt"
                  variant="outlined"
                  sx={{ padding: "0" }}
                  // endIcon={<FileUpload />}
                >
                  <label
                    style={{
                      cursor: "pointer",
                      fontSize: "1rem",
                      display: "flex",
                      padding: "0.5rem 1rem",
                    }}
                    htmlFor="upload-photo"
                  >
                    Upload Image <FileUpload />
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
            </div>
          </div>
          <div className="updatePassword-wrap">
            <p style={{ color: "868e96", fontWeight: "600" }}>
              Change your current password.
            </p>
            <div className="wrapFieldPassword">
              <TextField
                id="outlined-basic"
                label="Mật khẩu cũ"
                variant="outlined"
                disabled={!isEdit2}
                value={formPassword.oldPassword}
                onChange={(e) =>
                  setFormPassword((prev) => ({
                    ...prev,
                    oldPassword: e.target.value,
                  }))
                }
              />
              <TextField
                style={{ marginLeft: "5rem" }}
                id="outlined-basic"
                label="Mật khẩu mới"
                variant="outlined"
                disabled={!isEdit2}
                value={formPassword.newPassword}
                onChange={(e) =>
                  setFormPassword((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
            </div>

            <Button
              style={{ marginTop: "2rem" }}
              variant="outlined"
              size="large"
              onClick={() => {
                setIsEdit2(!isEdit2);
              }}
              disabled={isEdit2}
            >
              Chỉnh sửa
            </Button>

            {isEdit2 && (
              <Button
                style={{ marginTop: "2rem", marginLeft: "2rem" }}
                variant="contained"
                size="large"
                onClick={() => {
                  handleUpdatePassword();
                }}
              >
                Save Change
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
