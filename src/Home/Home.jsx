import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Popular from '../PopularSection/Popular';

const ShoppingLandingPage = () => {
  const [text, setText] = useState('');
  const fullText = 'E-Comm';
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
      
      <div className="main-container">
        <div className="content-section">
          <h1 className="main-title">
            {text.split('\n').map((line, i) => (
              <div key={i} className="title-line">{line}</div>
            ))}
            <span className="typing-cursor">|</span>
          </h1>
          
          <p className="platform-description">
            Your complete solution for online retail success. Build,
            manage, and grow your e-commerce business with our
            powerful platform.
          </p>

          <button className="explore-button">
            <Link to="/products">
              Get Started
            </Link>
          </button>
        </div>

        <div className="decorative-elements">
          <div className="floating-icons">
            <div className="icon shopping-bag">🛍️</div>
            <div className="icon cart">🛒</div>
            <div className="icon heart">❤️</div>
            <div className="icon star">⭐</div>
            <div className="icon gift">🎁</div>
            <div className="icon credit-card">💳</div>
            <div className="icon tag">🏷️</div>
            <div className="icon delivery">📦</div>
          </div>
          <div className="particle-effects">
            <div className="particle p1"></div>
            <div className="particle p2"></div>
            <div className="particle p3"></div>
            <div className="particle p4"></div>
          </div>
          <div className="gradient-orb"></div>
          <div className="gradient-lines">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
        </div>
      </div>

      <div className="popular-wrapper">
        <Popular />
      </div>
    </div>
  );
};

export default ShoppingLandingPage;