import { useState } from "react";
import { BACKEND_URL } from "../../constant";
import "./SignUp.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const baseApi = BACKEND_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/Auth/login`, formData);
      console.log("Đăng nhập thành công:", response.data);
      localStorage.setItem("accessToken", JSON.stringify(response.data));
      // navigate("/");
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Lỗi khi đăng nhập:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="signIn-wrap">
      <div className="boxSignIn">
        <div className="formSignIn">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>Đăng nhập</span>
          </div>
          <form onSubmit={handleRegister} className="form">
            <div className="formItem">
              <label htmlFor="email">Email</label>
              <input
                required
                onChange={handleChange}
                value={formData.email}
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>

            <div className="formItem">
              <label htmlFor="password">Mật khẩu</label>
              <input
                required
                onChange={handleChange}
                value={formData.password}
                id="password"
                type="password"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="signIn-btn">
              <button type="submit">Đăng nhập</button>
              <Link to="/auth/forgot-password">Quên mật khẩu ?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
