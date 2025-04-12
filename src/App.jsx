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

function App() {
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
              <HomePage />
            </UserLayout>
          }
        />

        <Route
          path="/post/:id"
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
          path="/admin/edit"
          element={
            <AdminLayout>
              <EditPost />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
