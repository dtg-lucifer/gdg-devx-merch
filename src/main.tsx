import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "./components/theme/theme-provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import PaymentPage from "./pages/PaymentPage";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  </ThemeProvider>
);
