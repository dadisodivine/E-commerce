import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Popular from '../PopularSection/Popular';

const ShoppingLandingPage = () => {
  const [text, setText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const fullText = 'Shop Smart, Live Better';
  const [index, setIndex] = useState(0);
  const categoryRefs = useRef([]);
  const promoRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Handle category cards animation
      categoryRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          if (isVisible) {
            ref.classList.add('visible');
          }
        }
      });

      // Handle promo banner animation
      if (promoRef.current) {
        const rect = promoRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          promoRef.current.classList.add('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="shopping-container">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
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
          <div className="category-card" ref={el => categoryRefs.current[0] = el}>
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <Link to="/category/fashion">Shop Now</Link>
          </div>
          <div className="category-card" ref={el => categoryRefs.current[1] = el}>
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
            <Link to="/category/electronics">Shop Now</Link>
          </div>
          <div className="category-card" ref={el => categoryRefs.current[2] = el}>
            <div className="category-icon">🏠</div>
            <h3>Home & Living</h3>
            <Link to="/category/home">Shop Now</Link>
          </div>
          <div className="category-card" ref={el => categoryRefs.current[3] = el}>
            <div className="category-icon">🎮</div>
            <h3>Gaming</h3>
            <Link to="/category/gaming">Shop Now</Link>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner" ref={promoRef}>
        <div className="promo-content">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <button className="promo-button">
            <Link to="/products">Shop Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingLandingPage;