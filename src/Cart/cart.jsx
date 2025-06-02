import React from "react";
import { useCart } from "./CartContext";
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart();

  const updateQuantity = (item, delta) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id);
    } else {
      const updatedProduct = { ...item, quantity: delta };
      addToCart(updatedProduct);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-main">
          <div className="cart-header">
            <h2 className="cart-title">Shopping Cart</h2>
            <span className="items-count">{itemCount} Items</span>
          </div>
          
          {cart.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img 
                    src={item.image && item.image.startsWith('http') ? item.image : '/vite.svg'} 
                    alt={item.title} 
                    className="cart-item-img" 
                    onError={e => e.target.src = '/vite.svg'} 
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <div className="cart-item-details">
                      <div className="cart-qty-controls">
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item, -1)}>-</button>
                        <span className="cart-item-qty">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item, 1)}>+</button>
                      </div>
                      <span className="cart-item-price">€ {item.price}</span>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                </li>
              ))}
            </ul>
          )}
          
          <Link to="/products" className="back-to-shop">
            ← Back to shop
          </Link>
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Summary</h3>
          
          <div className="summary-row">
            <span>ITEMS {itemCount}</span>
            <span>€ {total.toFixed(2)}</span>
          </div>

          <div className="summary-shipping">
            <label>SHIPPING</label>
            <select className="shipping-select">
              <option>Standard Delivery- €5.00</option>
              <option>Express Delivery- €10.00</option>
            </select>
          </div>

          <div className="summary-code">
            <label>GIVE CODE</label>
            <div className="code-input">
              <input type="text" placeholder="Enter your code" />
              <button className="code-submit">→</button>
            </div>
          </div>

          <div className="summary-total">
            <span>TOTAL PRICE</span>
            <span>€ {(total + 5).toFixed(2)}</span>
          </div>

          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;