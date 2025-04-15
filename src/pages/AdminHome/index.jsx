import { useEffect } from "react";
import "./AdminHome.scss";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const hasToken = !!accessToken;
  useEffect(() => {
    if (!hasToken) navigate("/auth/signup");
  }, [hasToken, navigate]);
  return (
    <>
      <div>Admin page</div>
    </>
  );
}
