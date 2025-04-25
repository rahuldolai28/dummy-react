import { useEffect, useState, useMemo } from "react";
import "./filter.css";

export default function FilterProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/products", {
                method: "GET",
            });
            const result = await response.json();

            if (result && result.products && result.products.length > 0) {
                setLoading(false);
                setProducts(result.products);
                setFilteredItems(result.products);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching products:", error);
        }
    }
    useEffect(() => {
        fetchProducts();
        console.log("mounted");
    }, []);

    const uniqueCategories = useMemo(() => {
        if (products.length === 0) return [];
        return [...new Set(products.map((item) => item.category))];
    }, [products]);

    useEffect(() => {
        const copyProducts = [...products];
        setFilteredItems(
            currentSelectedCategory !== ""
                ? copyProducts.filter(
                      (productItem) =>
                          productItem.category.toLowerCase() ===
                          currentSelectedCategory.toLowerCase()
                  )
                : copyProducts
        );
    }, [currentSelectedCategory, products]);

    if (loading) {
        return <div className="info">Product Details Loading...</div>;
    }
    if (products.length === 0) {
        return <div className="info">No products found</div>;
    }
    return (
        <div className="filter-products-container">
            <h1 className="title">Filter Products By Category</h1>
            <div className="filter-categories-container">
                {uniqueCategories.map((uniqueCategoryItem) => (
                    <button
                        key={uniqueCategoryItem}
                        onClick={() =>
                            setCurrentSelectedCategory(
                                currentSelectedCategory !== "" &&
                                    currentSelectedCategory ===
                                        uniqueCategoryItem
                                    ? ""
                                    : uniqueCategoryItem
                            )
                        }
                        className={`category-item ${
                            currentSelectedCategory === uniqueCategoryItem
                                ? "active"
                                : ""
                        }`}>
                        {uniqueCategoryItem}
                    </button>
                ))}
            </div>
            <ul className="list-of-products">
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((product) => {
                        return (
                            <li key={product.id} className="product-item">
                                <div className="product-info">
                                    <p>{product.title}</p>
                                    <p>Price: ${product.price}</p>
                                    <button>
                                        Category: {product.category}
                                    </button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <div className="info">No products found</div>
                )}
            </ul>
        </div>
    );
}
