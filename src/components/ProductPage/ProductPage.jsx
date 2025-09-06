import { useState, useEffect } from "react";
import "./ProductPage.css";
import productsData from "../../data/products.json";

function ProductPage({ onAddToCart }) {
  // console.log(onAddToCart);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setProducts(productsData);

    const uniqueCategories = [
      ...new Set(productsData.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);

    if (uniqueCategories.length > 0) {
      setSelectedCategory(uniqueCategories[0]);
    }
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="product-page" id="categories">
      <header className="category-header">
        <h1>Our Products</h1>
        <p>Browse through our exclusive range of products</p>
      </header>

      <nav className="category-options">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              onClick={() => (window.location.href = `/product/${product.id}`)}
              key={product.id}
              className="product-card"
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => onAddToCart(product, e)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="empty-state">No products found for this category.</p>
        )}
      </section>
    </div>
  );
}

export default ProductPage;
