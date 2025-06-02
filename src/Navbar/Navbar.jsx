import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import "./Navbar.css";
import shopLogo from '../assets/shop-logo.svg';

const Navbar = () => {
  const location = useLocation();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo animated-logo">
        <Link to="/">
          <img src={shopLogo} alt="E-Shop Logo" className="logo-image" />
          <span className="logo-text">
            <span className="logo-e">E</span>
            <span className="logo-dash">-</span>
            <span className="logo-shop">Shop</span>
          </span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" title="Home">
            <span className="nav-icon">🏠</span>
          </Link>
        </li>
        <li className={location.pathname === "/products" ? "active" : ""}>
          <Link to="/products" title="Products">
            <span className="nav-icon">🛍️</span>
          </Link>
        </li>
        <li className={location.pathname === "/cart" ? "active" : ""}>
          <Link to="/cart" title="Cart">
            <span className="nav-icon cart-icon">
              🛒
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </span>
          </Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users" title="User Profile">
            <span className="nav-icon">👤</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
