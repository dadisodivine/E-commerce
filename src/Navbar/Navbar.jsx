import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">E-Shop</div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/products" ? "active" : ""}>
          <Link to="/products">Products</Link>
        </li>
        <li className={location.pathname === "/chat" ? "active" : ""}>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
