import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import productsData from "../../data/featured-products.json";
import "./FeaturedProductsCarousel.css";

function FeaturedProductsCarousel({ onAddToCart }) {
  const products = productsData.featuredProducts;

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <section className="featured-products-carousel" id="products">
      <h2>Featured Products</h2>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
        emulateTouch={true}
        swipeable={true}
        className="product-carousel"
      >
        {products.map((product) => (
          <div key={product.id} className="product-slide">
            <div
              className="product-content"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, e);
                  }}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default FeaturedProductsCarousel;
