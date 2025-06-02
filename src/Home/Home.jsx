import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Popular from '../PopularSection/Popular';

const ShoppingLandingPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);
  };

  return (
    <div className="shopping-container">
      <Navbar />
      
      <div className="main-container">
        
        <div className="content-section">
          <h1 className="main-title">
            Ecommerce
          </h1>
          
          <p className="description">
            Discover the best deals on the latest products, from electronics to fashion and more. 
            Shop with confidence, enjoy fast delivery, and experience seamless online shopping. 
            Your one-stop destination for everything you need—exclusive offers, top brands, and unbeatable prices await!
          </p>

          <button 
            className={`learn-more-button ${buttonClicked ? 'clicked' : ''}`}
            onClick={handleButtonClick}
          >
            <Link to="/products">
              Visit store
            </Link>
          </button>

          <div className="progress-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="illustration-section">
          <img 
            src="/shopping-illustration.svg" 
            alt="Shopping illustration with people and shopping bags"
            className="main-illustration" 
          />
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="popular-wrapper">
        <Popular />
      </div>

      {/* Floating Action Bubbles - keeping these from the original */}
      <div className="floating-actions">
        <Link to="/favorites" className='Link'>
          <div className="action-bubble bubble-1 pulse-animation" data-tooltip="Favorites">💎</div>
        </Link>
        <div className="action-bubble bubble-2 pulse-animation" data-tooltip="Chat">💬</div>
      </div>
    </div>
  );
};

export default ShoppingLandingPage;