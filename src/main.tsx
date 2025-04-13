import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "./components/theme/theme-provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* @TODO other routes here */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </ThemeProvider>
);
