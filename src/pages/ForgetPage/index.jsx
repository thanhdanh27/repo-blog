import { useState } from "react";
import { BACKEND_URL } from "../../constant";
import "./SignUp.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function ForgetPage() {
  const baseApi = BACKEND_URL;
  const [isOpenResetBtn, setIsOpenResetBtn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    passwordResetToken: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseApi}/Auth/ResetPassword`,
        formData
      );
      setResetSuccess(!resetSuccess);
      console.log("Khôi phục mk thành công:", response.data);
    } catch (error) {
      console.error(
        "Lỗi khi đăng nhập:",
        error.response?.data || error.message
      );
    }
  };

  const handleGetCode = async (e) => {
    e.preventDefault();
    setIsLoading(!loading);

    try {
      const response = await axios.post(
        `${baseApi}/Auth/ForgotPassword?email=${encodeURIComponent(
          formData.email
        )}`
      );
      console.log("Gửi mã thành công:", response.data);
      setIsSend(true);
      setIsOpenResetBtn(!isOpenResetBtn);
    } catch (error) {
      console.error(
        "Lỗi khi đăng nhập:",
        error.response?.data || error.message
      );
    }
  };
  console.log(formData);

  return (
    <div>
      <div className="signIn-wrap">
        <div className="boxSignIn">
          <div className="formSignIn">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!resetSuccess && <span>Khôi phục mật khẩu</span>}
              {resetSuccess && (
                <div>
                  <span>Khôi phục mật khẩu thành công</span> <br />
                  <Link to="/auth/signin">Quay về trang đăng nhập</Link>
                </div>
              )}
            </div>

            {!resetSuccess && (
              <form className="form">
                <div className="formItem">
                  <label htmlFor="email">Email </label>
                  <input
                    required
                    onChange={handleChange}
                    value={formData.email}
                    id="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>

                {isOpenResetBtn && (
                  <>
                    <div className="formItem">
                      <label htmlFor="password">Mã khôi phục</label>
                      <input
                        required
                        onChange={handleChange}
                        value={formData.passwordResetToken}
                        id="passwordResetToken"
                        type="text"
                        placeholder="Code"
                      />
                    </div>

                    <div className="formItem">
                      <label htmlFor="password">Mật khẩu mới</label>
                      <input
                        required
                        onChange={handleChange}
                        value={formData.newPassword}
                        id="newPassword"
                        type="password"
                        placeholder="Mật khẩu mới"
                      />
                    </div>
                  </>
                )}

                <div className="signIn-btn">
                  {isSend ? (
                    <p
                      style={{
                        fontSize: "1.2rem",
                        color: "red",
                        marginBottom: "1rem",
                      }}
                    >
                      Email chứa mã khôi phục đã được gửi!
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: "1.2rem",
                        color: "#868e96",
                        marginBottom: "1rem",
                      }}
                    >
                      Bạn sẽ nhận được email chứa mã khôi phục.
                    </p>
                  )}
                  {isOpenResetBtn && (
                    <button onClick={handleReset} type="submit">
                      Khôi phục mật khẩu
                    </button>
                  )}
                  {!isOpenResetBtn && (
                    <button onClick={handleGetCode}>
                      {!loading && <p> Nhận mã code</p>}
                      {loading && (
                        <CircularProgress
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#fff",
                          }}
                        />
                      )}
                    </button>
                  )}
                  <Link to="/auth/signin">Quay lại trang đăng nhập</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
