import { useState } from "react";
import { BACKEND_URL } from "../../constant";
import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const baseApi = BACKEND_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/Auth/register`, formData);
      console.log("Đăng ký thành công:", response.data);
      navigate("/auth/signin");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
    }
  };

  return (
    <div className="signIn-wrap">
      <div className="boxSignIn">
        <div className="formSignIn">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>Create New Account</span>
          </div>
          <form onSubmit={handleRegister} className="form">
            <div className="formItem">
              <label htmlFor="username">Username</label>
              <input
                required
                onChange={handleChange}
                value={formData.username}
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="formItem">
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="password">Password</label>
              <input
                required
                onChange={handleChange}
                value={formData.password}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="signIn-btn">
              <button type="submit">Sign Up</button>
              <a href="/auth/signin">Already have an account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
