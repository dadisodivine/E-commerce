import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Popular from '../PopularSection/Popular';
import Navbar from '../Navbar/Navbar';


const ShoppingLandingPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const sceneRef = useRef(null);
  const elementsRef = useRef([]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    setTimeout(() => setIsLoaded(true), 500);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  // Enhanced button click handler
  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setEmail('');
    alert('Thanks for subscribing!');
  };

  // Floating elements data
  const floatingElements = [
    { type: 'sphere', id: 1, size: 80, color: 'gradient-orange', position: { top: '20%', left: '15%' }, delay: 0 },
    { type: 'sphere', id: 2, size: 60, color: 'gradient-purple', position: { top: '60%', left: '10%' }, delay: 1 },
    { type: 'sphere', id: 3, size: 40, color: 'gradient-yellow', position: { top: '15%', left: '25%' }, delay: 2 },
    { type: 'sphere', id: 4, size: 100, color: 'gradient-orange', position: { top: '70%', left: '25%' }, delay: 0.5 },
    { type: 'sphere', id: 5, size: 50, color: 'gradient-pink', position: { top: '30%', left: '8%' }, delay: 1.5 },
  ];

  const stripedBalls = [
    { id: 1, size: 120, position: { top: '45%', left: '35%' }, delay: 0 },
    { id: 2, size: 80, position: { top: '25%', left: '40%' }, delay: 1 },
    { id: 3, size: 150, position: { top: '65%', left: '45%' }, delay: 2 },
  ];

  const features = [
    { icon: '🚚', title: 'Free Shipping', description: 'On orders over $50' },
    { icon: '⚡', title: 'Fast Delivery', description: '2-3 business days' },
    { icon: '🔒', title: 'Secure Payment', description: 'SSL encryption' },
    { icon: '💬', title: '24/7 Support', description: 'Always here to help' }
  ];

  const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance'];

  return (
    <div className={`shopping-container ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />
      
      {/* Main Content Container */}
      <div className="main-container">
        
        {/* Left Side - 3D Scene */}
        <div className="scene-container" ref={sceneRef}>
          
          {/* Gradient Background */}
          <div className="gradient-bg"></div>
          
          {/* Floating Spheres */}
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className={`sphere ${element.color} float-animation`}
              style={{
                width: `${element.size}px`,
                height: `${element.size}px`,
                top: element.position.top,
                left: element.position.left,
                animationDelay: `${element.delay}s`,
                transform: `translate(${mousePosition.x * (element.delay + 1) * 3}px, ${mousePosition.y * (element.delay + 1) * 3}px)`
              }}
              ref={el => elementsRef.current[element.id] = el}
            >
              <div className="sphere-highlight"></div>
            </div>
          ))}
          
          {/* Striped Balls */}
          {stripedBalls.map((ball) => (
            <div
              key={ball.id}
              className="striped-ball float-reverse"
              style={{
                width: `${ball.size}px`,
                height: `${ball.size}px`,
                top: ball.position.top,
                left: ball.position.left,
                animationDelay: `${ball.delay}s`,
                transform: `translate(${mousePosition.x * ball.delay * 2}px, ${mousePosition.y * ball.delay * 2}px)`
              }}
            >
              <div className="ball-highlight"></div>
            </div>
          ))}
          
          {/* Shopping Cart */}
          <div 
            className="shopping-cart wiggle-animation"
            style={{
              transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
            }}
          >
            <div className="cart-body">
              <div className="cart-grid"></div>
            </div>
            <div className="cart-handle"></div>
            <div className="cart-wheel cart-wheel-1">
              <div className="wheel-inner"></div>
            </div>
            <div className="cart-wheel cart-wheel-2">
              <div className="wheel-inner"></div>
            </div>
          </div>
          
          {/* Heart Icons */}
          <div className="heart-icon heart-1 pulse-animation">
            <div className="heart-bg">
              <span className="heart-emoji">❤️</span>
            </div>
          </div>
          <div className="heart-icon heart-2 pulse-animation">
            <div className="heart-bg">
              <span className="heart-emoji">❤️</span>
            </div>
          </div>
          
          {/* Package Box */}
          <div className="package-box float-animation">
            <div className="box-top"></div>
            <div className="box-front"></div>
            <div className="box-heart">❤️</div>
          </div>
        </div>

        {/* Right Side - Content */}
          <div className="content-section">
            <h1 className="main-title slide-in-right">
              <span className="title-line">
                {['S', 'H', 'O', 'P', 'P', 'I', 'N', 'G'].map((letter, index) => (
            <span 
              key={index} 
              className="letter-animation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
                ))}
              </span>
              <span className="title-line">
                {['O', 'N', 'L', 'I', 'N', 'E'].map((letter, index) => (
            <span 
              key={index} 
              className="letter-animation"
              style={{ animationDelay: `${(index + 8) * 0.1}s` }}
            >
              {letter}
            </span>
                ))}
              </span>
            </h1>
            
            <p className="description slide-in-right">
              Discover the latest trends and exclusive deals at our online store. 
              Enjoy a seamless shopping experience with fast delivery, secure payments, 
              and a wide selection of products to suit every style and need. 
              Shop with confidence and elevate your everyday with quality you can trust.
            </p>
            
            {/* Features Section */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <span className="feature-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            <button 
              className={`cta-button slide-in-up ${buttonClicked ? 'clicked' : ''}`}
              onClick={handleButtonClick}
            >
              <Link to="products" className='Link'>
                <span className="button-text">Shop Now</span>
              </Link>
              <div className="button-bg"></div>
            </button>
          </div>
              </div>

              {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers and updates</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Brands Section */}
      <div className="brands-section">
        <h2>Trusted by Leading Brands</h2>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Bubbles */}
      <div className="floating-actions">
        <Link to="/favorites" className='Link'>
          <div className="action-bubble bubble-1 pulse-animation" data-tooltip="Favorites">💎</div>
        </Link>
        <div className="action-bubble bubble-2 pulse-animation" data-tooltip="Chat">💬</div>
      </div>
      <Popular />
    </div>
  );
};

export default ShoppingLandingPage;