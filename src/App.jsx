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
import { AvatarProvider } from "./AvatarContext";
import ForgetPage from "./pages/ForgetPage";
import ManagerUser from "./pages/ManagerUser";
import ShopPage from "./pages/Shop";

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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   console.log(filter);
  //   if (filter) {
  //     // Gọi API theo giá trị từ Header gửi về
  //     fetchData(filter);
  //   }
  // }, [filter]);

  // const fetchData = async (filterValue) => {
  //   console.log("Gọi API với filter:", filterValue);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/Post/ByCategory/${filterValue}`
  //     );
  //     console.log("Danh sách bài viết:", response.data);
  //     setPosts(response.data);
  //     // return response.data; // Trả về để sử dụng nơi khác
  //   } catch (error) {
  //     console.error(
  //       "Lỗi khi lấy bài viết:",
  //       error.response?.data || error.message
  //     );
  //     return []; // Trả mảng rỗng nếu lỗi
  //   }
  // };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data); // hiển thị tất cả ban đầu
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const shouldShowAll =
      !filter ||
      filter.length === 0 ||
      filter.includes("67fd43e0d84b48830ccc0e22");

    setFilteredPosts(
      shouldShowAll
        ? posts
        : posts.filter((post) =>
            post.categories?.some((cat) => filter.includes(cat.categoryId))
          )
    );
  }, [filter, posts]);

  // console.log(filteredPosts);

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
          path="/auth/forgot-password"
          element={
            <UserLayout>
              <ForgetPage />
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
            <UserLayout onFilterChange={setFilter}>
              <HomePage data={filteredPosts} />
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

        <Route
          path="/shop"
          element={
            <UserLayout>
              <ShopPage />
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
          path="/admin/manager-user"
          element={
            <AdminLayout>
              <ManagerUser />
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
