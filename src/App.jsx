import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import About from "./pages/About";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
