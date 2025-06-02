import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css'; // Assuming you have a CSS file for styling
import { useCart } from "../Cart/CartContext";

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const [added, setAdded] = useState(false);
    const {id} =useParams();
    const { addToCart, cart } = useCart();

    useEffect(() => {
        const url = `https://fakestoreapi.in/api/products/${id}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.product);
                setProduct(data.product);

                // Here you can set the product data to state or do something with it
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
        
    }, [id]);
    console.log(product);
    return ( 
        <div className="product-detail-modal">
            <div className="product-detail-content">
                <button className="close-btn" onClick={() => window.history.back()}>&#10006;</button>
                {product ? (
                    <>
                        <div className="product-detail-image-section">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="product-detail-image"
                              onError={e => e.target.src = '/vite.svg'}
                            />
                        </div>
                        <div className="product-detail-info-section">
                            <h2 className="product-detail-title">{product.title}</h2>
                            <div className="product-detail-pricing">
                                {product.oldPrice && (
                                    <span className="old-price">${product.oldPrice}</span>
                                )}
                                <span className="new-price">${product.price}</span>
                                {product.discountPercentage && (
                                    <span className="discount">{product.discountPercentage}% off</span>
                                )}
                            </div>
                            <div className="product-detail-meta">
                                <div><b>Brand:</b> {product.brand}</div>
                                <div><b>Model:</b> {product.model || product.category}</div>
                                <div><b>Color:</b> {product.color || 'N/A'}</div>
                            </div>
                            <div className="product-detail-description">
                                <b>About this product:</b>
                                <p>{product.description}</p>
                            </div>
                            <button
                              className="add-to-cart-btn"
                              onClick={() => {
                                addToCart(product);
                                setAdded(true);
                                setTimeout(() => setAdded(false), 1200);
                              }}
                            >
                              {added ? "Added to Cart" : "Add to Cart"}
                              {cart && cart.length > 0 && (
                                <span className="cart-count-indicator">({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                              )}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <span>Loading...</span>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default ProductDetail;