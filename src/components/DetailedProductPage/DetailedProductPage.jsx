
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../data/products.json";
import reviewsData from "../../data/reviews.json";
import "./DetailedProductPage.css";

function DetailedProductPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", review: "", rating: 5 });

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    const productReviews = reviewsData.filter(review => review.productId === parseInt(id));
    setReviews(productReviews);
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      productId: parseInt(id),
      ...newReview,
    };
    setReviews([...reviews, review]);
    setNewReview({ name: "", review: "", rating: 5 });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="detailed-product-page">
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        <form onSubmit={handleSubmitReview} className="review-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            required
          />
          <textarea
            placeholder="Your Review"
            value={newReview.review}
            onChange={(e) => setNewReview({...newReview, review: e.target.value})}
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
          >
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.name}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < review.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailedProductPage;
