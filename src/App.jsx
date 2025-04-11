import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPost from "./pages/DetailPost";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/post/:id" element={<DetailPost />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
