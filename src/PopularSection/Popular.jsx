import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../FetchProducts/FetchProducts";
import "./Popular.css";
import { Link } from "react-router-dom";

const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([]);    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const slideInterval = useRef(null);
    const visibleSlides = 6;

    useEffect(() => {
        fetchProducts()
            .then(data => {
                // Filter products with popular property set to true
                const popular = data.products.products.filter(
                    (product) => product.popular === true
                );
                setPopularProducts(popular);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching popular products:", error);
                setPopularProducts([]);
                setLoading(false);
            });
    }, []);

    const slideCount = popularProducts.length;

    // Auto-slide effect
    useEffect(() => {
        if (slideCount <= visibleSlides) return;
        slideInterval.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % (slideCount - visibleSlides + 1));
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(slideInterval.current);
    }, [slideCount, visibleSlides]);

    return (
        <div className="popular-section">
            <h2 className="popular-title">Popular Products</h2>
            {loading ? (
                <div className="popular-loading-spinner"></div>
            ) : (
                <div className="popular-slider-container">
                    <div className="popular-slider-track">
                        {popularProducts.slice(currentSlide, currentSlide + visibleSlides).map(product => (
                          <Link to={`/product/${product.id}`} key={product.id} className="Link">
                            <div className="popular-card">
                                <img src={product.image} alt={product.title} className="popular-img" />
                                <p className="popular-price">${product.price}</p>
                            </div>
                          </Link> 
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popular;