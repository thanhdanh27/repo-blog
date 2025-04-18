import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.scss";
import DetailPost from "./pages/DetailPost";
import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminHome from "./pages/AdminHome";
import EditPost from "./pages/EditPost";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BACKEND_URL } from "./constant";
import { useEffect, useState } from "react";
import axios from "axios";
import ManagerPost from "./pages/ManagerPost";
import ManagerProfile from "./pages/ManagerProfile";

function App() {
  const baseApi = BACKEND_URL;

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseApi}/Post`);
      // console.log("Danh sách bài viết:", response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error(
        "Lỗi khi lấy bài viết:",
        error.response?.data || error.message
      );
      return []; // Trả mảng rỗng nếu lỗi
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // const fetchAndSetPosts = async () => {
  //   const data = await getPostsByAuthorId();
  //   setPostsByAuthorId(data); // quan trọng!
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout người dùng */}

        <Route
          path="/auth/signup"
          element={
            <UserLayout>
              <SignUp />
            </UserLayout>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <UserLayout>
              <SignIn />
            </UserLayout>
          }
        />

        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage data={posts} />
            </UserLayout>
          }
        />

        <Route
          path="/post/:postId"
          element={
            <UserLayout>
              <DetailPost />
            </UserLayout>
          }
        />

        {/* Layout admin */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/upload-post"
          element={
            <AdminLayout>
              <EditPost />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/update-post/:postId"
          element={
            <AdminLayout>
              <EditPost />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/manager"
          element={
            <AdminLayout>
              <ManagerPost />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manager-profile"
          element={
            <AdminLayout>
              <ManagerProfile />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
