import { useState, useEffect } from "react";
import data from "../../data/reviews.json";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(data);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="reviews-section" id="review">
      <h2>Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>Loading reviews...</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-name">{review.name}</div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
