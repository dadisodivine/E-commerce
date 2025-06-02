import { useState } from "react";
import "./sidebar.css";

const categories = ["Tv", "Audio", "Laptop", "Mobile", "Gaming", "Appliances"];

const Sidebar = ({ onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    return ( 
        <div className="sidebar">
            <div className="sidebar-logo">
                <span role="img" aria-label="shop">🛍️</span>
            </div>
            <div className="sidebar-title">Categories</div>
            <ul className="sidebar-list">
                {categories.map((cat) => (
                    <li
                        key={cat}
                        className={activeCategory === cat ? "active" : ""}
                        onClick={() => {
                            setActiveCategory(cat);
                            if (onCategorySelect) onCategorySelect(cat);
                        }}
                    >
                        {cat}
                    </li>
                ))}
            </ul>
        </div>
     );
}
 
export default Sidebar;