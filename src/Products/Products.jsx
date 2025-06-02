import { useEffect, useState } from "react";
import { fetchProducts } from "../FetchProducts/FetchProducts";
import "./Products.css"; // Ensure you have a CSS file for styling
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/sidebar";
import { Link } from "react-router-dom";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const productsPerPage = 20;

    

    useEffect(() => {
        fetchProducts()
            .then(data => {
                // Ensure products is always an array
                setProducts(data.products.products);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]); // Fallback to empty array on error
            })
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase())
        : paginatedProducts;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const displayProducts = loading ? (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading...</span>
        </div>
    ) : (
        <div className="products-grid">
            {filteredProducts.map(product => (
                <Link to={`/product/${product.id}`} className="Link" key={product.id}>
                    <div className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );

    const pagination = (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={`pagination-btn${currentPage === i + 1 ? ' active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );

    return ( 
        <div className="products-container">
            <Navbar />
            {pagination}
            <Sidebar onCategorySelect={setSelectedCategory} />
            {displayProducts}

            {/* Floating Action Bubbles */}
            <div className="floating-actions">
                <Link to="/cart" className='Link'>
                    <div className="action-bubble bubble-1 pulse-animation" data-tooltip="View your cart">🛒</div>
                </Link>
                <Link to="/chat" className='Link'>
                    <div className="action-bubble bubble-2 pulse-animation" data-tooltip="Favorites">💎</div>
                </Link>
                <div className="action-bubble bubble-3 pulse-animation" data-tooltip="Chat">⭐</div>
            </div>
        </div>
     );
}
 
export default Products;