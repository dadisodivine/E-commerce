import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingLandingPage from "./Home/Home";
import Products from "./Products/Products";
import ProductDetail from "./ProductDetail/ProductGetail";
import { CartProvider } from "./Cart/CartContext";
import Cart from "./Cart/cart";
// Import other pages/components as needed
// import About from "./About";
// import Contact from "./Contact";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingLandingPage />} />
          <Route path="products" element={<Products/>} /> 
          <Route path="product/:id" element={<ProductDetail />} /> 
          <Route path="cart" element={<Cart />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
