import { useEffect, useState, useMemo } from "react";
import "./filter.css";

export default function FilterProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState("");
    const [error, setError] = useState(""); // <-- Added error state

    async function fetchProducts() {
        setLoading(true);
        setError(""); // reset error
        try {
            const response = await fetch("https://dummyjson.com/products");
            const result = await response.json();

            if (result?.products?.length > 0) {
                setProducts(result.products);
                setFilteredItems(result.products);
            } else {
                setProducts([]);
                setFilteredItems([]);
            }
        } catch (err) {
            setError("Network error. Please check your internet connection.");
            setProducts([]);
            setFilteredItems([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const uniqueCategories = useMemo(() => {
        return [...new Set(products.map((item) => item.category))];
    }, [products]);

    useEffect(() => {
        setFilteredItems(
            currentSelectedCategory
                ? products.filter(
                      (product) =>
                          product.category.toLowerCase() ===
                          currentSelectedCategory.toLowerCase()
                  )
                : products
        );
    }, [currentSelectedCategory, products]);

    return (
        <div className="filter-products-container">
            <h1 className="title">8. Filter Products By Category</h1>

            <div className="filter-categories-container">
                {uniqueCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() =>
                            setCurrentSelectedCategory(
                                currentSelectedCategory === category ? "" : category
                            )
                        }
                        className={`category-item ${
                            currentSelectedCategory === category ? "active" : ""
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <ul className="list-of-products">
                {loading ? (
                    <li className="info">Product Details Loading...</li>
                ) : error ? (
                    <li className="info">{error}</li>
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((product) => (
                        <li key={product.id} className="product-item">
                            <div className="product-info">
                                <p>{product.title}</p>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="info">No products found</li>
                )}
            </ul>
        </div>
    );
}
