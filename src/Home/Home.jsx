import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Popular from '../PopularSection/Popular';

const ShoppingLandingPage = () => {
  const [text, setText] = useState('');
  const fullText = 'Shop Smart, Live Better';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const typing = setTimeout(() => {
        setText(prevText => prevText + fullText[index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(typing);
    } else {
      const resetTimeout = setTimeout(() => {
        setText('');
        setIndex(0);
      }, 3000);

      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  return (
    <div className="shopping-container">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            {text}
            <span className="typing-cursor">|</span>
          </h1>
          <p className="platform-description">
            Discover amazing products at unbeatable prices. Shop the latest trends
            and enjoy exclusive deals every day.
          </p>
          <div className="hero-buttons">
            <button className="primary-button">
              <Link to="/products">Shop Now</Link>
            </button>
            <button className="secondary-button">
              <Link to="/categories">Browse Categories</Link>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-icons">
            <div className="icon shopping-bag">🛍️</div>
            <div className="icon cart">🛒</div>
            <div className="icon heart">❤️</div>
            <div className="icon star">⭐</div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="featured-categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <Link to="/category/fashion">Shop Now</Link>
          </div>
          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
            <Link to="/category/electronics">Shop Now</Link>
          </div>
          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Living</h3>
            <Link to="/category/home">Shop Now</Link>
          </div>
          <div className="category-card">
            <div className="category-icon">🎮</div>
            <h3>Gaming</h3>
            <Link to="/category/gaming">Shop Now</Link>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <button className="promo-button">
            <Link to="/products">Shop Now</Link>
          </button>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="popular-wrapper">
        <h2 className="section-title">Popular Products</h2>
      </div>
    </div>
  );
};

export default ShoppingLandingPage;