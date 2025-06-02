import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Popular from '../PopularSection/Popular';

const ShoppingLandingPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'Welcome to Your Online Shopping Destination';
  const [index, setIndex] = useState(0);
  
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const illustrationRef = useRef(null);

  useEffect(() => {
    const observers = [];
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animate-active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [descriptionRef, buttonRef, illustrationRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  // Typing animation effect
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
            {text}<span className="typing-cursor">|</span>
          </h1>
          
          <p className="description scroll-animate" ref={descriptionRef}>
            Discover the best deals on the latest products, from electronics to fashion and more. 
            Shop with confidence, enjoy fast delivery, and experience seamless online shopping. 
            Your one-stop destination for everything you need—exclusive offers, top brands, and unbeatable prices await!
          </p>

          <button 
            className={`learn-more-button scroll-animate ${buttonClicked ? 'clicked' : ''}`}
            onClick={handleButtonClick}
            ref={buttonRef}
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
        <div className="illustration-section scroll-animate" ref={illustrationRef}>
          <img 
            src="/shopping-illustration.svg" 
            alt="Shopping illustration with people and shopping bags"
            className="main-illustration" 
          />
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="popular-wrapper scroll-animate">
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