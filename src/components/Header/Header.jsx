import { useState } from "react";
import "./Header.css";

function Header({ cart, onRemoveFromCart, onUpdateCartQuantity, onClearCart }) {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);

  const toggleCart = () => {
    const shoppingCart = document.querySelector(".shopping-cart");
    shoppingCart.classList.toggle("active");
    document.querySelector(".login-form").classList.remove("active");
    document.querySelector(".signup-form").classList.remove("active");
    document.querySelector(".navbar").classList.remove("active");
  };

  const toggleLogin = () => {
    const loginForm = document.querySelector(".login-form");
    loginForm.classList.toggle("active");
    document.querySelector(".shopping-cart").classList.remove("active");
    document.querySelector(".signup-form").classList.remove("active");
    document.querySelector(".navbar").classList.remove("active");
  };

  const toggleSignup = () => {
    const signupForm = document.querySelector(".signup-form");
    signupForm.classList.toggle("active");
    document.querySelector(".shopping-cart").classList.remove("active");
    document.querySelector(".login-form").classList.remove("active");
    document.querySelector(".navbar").classList.remove("active");
  };

  const toggleMenu = () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
    document.querySelector(".shopping-cart").classList.remove("active");
    document.querySelector(".login-form").classList.remove("active");
    document.querySelector(".signup-form").classList.remove("active");
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!orderDetails.name.trim()) newErrors.name = "Name is required.";
    if (!orderDetails.email.trim()) newErrors.email = "Email is required.";
    if (!orderDetails.address.trim())
      newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleConfirmOrder = () => {
    if (!validateFields()) {
      return; 
    }

    setShowThankYou(true);
    setCheckoutOpen(false);
    setOrderDetails({ name: "", email: "", address: "" });
    onClearCart();
  };

  return (
    <div className="Header">
      <a href="#" className="logo">
        <i className="fa-solid fa-shoe-prints"></i> VK Footwear
      </a>
      <nav className="navbar">
        <a href="#home">home</a>
        <a href="#features">features</a>
        <a href="#products">products</a>
        <a href="#categories">categories</a>
        <a href="#review">reviews</a>
      </nav>
      <div className="icons">
        <div className="fas fa-bars" id="menu-btn" onClick={toggleMenu}></div>
        <div
          className="fas fa-shopping-cart"
          id="cart-btn"
          onClick={toggleCart}
        >
          {totalCartItems > 0 && (
            <span className="cart-item-count">{totalCartItems}</span>
          )}
        </div>
        <div className="fas fa-user" id="user-btn" onClick={toggleLogin}></div>
      </div>
      <form action="" className="login-form">
        <h3>login now</h3>
        <input type="email" placeholder="your email" className="box" />
        <input type="password" placeholder="your password" className="box" />
        <p>
          don&#39;t have an account{" "}
          <a onClick={toggleSignup}>
            create now
          </a>
        </p>
        <input type="submit" value="login now" className="btn" />
      </form>
      <form action="" className="signup-form">
        <h3>sign up now</h3>
        <input type="text" placeholder="your name" className="box" />
        <input type="email" placeholder="your email" className="box" />
        <input type="password" placeholder="create password" className="box" />
        <p>
          already have an account?{" "}
          <a onClick={toggleLogin}>
            login now
          </a>
        </p>
        <input type="submit" value="sign up" className="btn" />
      </form>
      <div className="shopping-cart">
        <div className="container">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="box">
                <img src={item.image} alt={item.name} />
                <div className="content">
                  <h3>{item.name}</h3>
                  <span className="price">
                    ${(item.price).toFixed(2)}
                  </span>
                  <div className="quantity-control">
                    <button
                      className="decrease"
                      onClick={() => onUpdateCartQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="increase"
                      onClick={() => onUpdateCartQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <i
                  className="fas fa-trash"
                  onClick={() => onRemoveFromCart(item.id)}
                ></i>
              </div>
            ))
          ) : (
            <p className="empty-state">Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="total">
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        )}
        <button
          className="btn"
          disabled={cart.length === 0}
          onClick={() => setCheckoutOpen(true)}
        >
          Checkout
        </button>
      </div>
      {isCheckoutOpen && (
        <div className="checkout">
          <div className="checkout-content">
            <h3>Confirm Order</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`box ${errors.name ? "error" : ""}`}
              value={orderDetails.name}
              onChange={handleInputChange}
              autoComplete="name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className={`box ${errors.email ? "error" : ""}`}
              value={orderDetails.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <textarea
              name="address"
              placeholder="Your Address"
              className={`box ${errors.address ? "error" : ""}`}
              value={orderDetails.address}
              onChange={handleInputChange}
              autoComplete="street-address"
            ></textarea>
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}

            <div className="checkout-buttons">
              <button className="btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
              <button className="btn" onClick={() => setCheckoutOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showThankYou && (
        <div className="thank-you">
          <p>Thank you for your order!</p>
          <button className="btn" onClick={() => setShowThankYou(false)}>
            Close
          </button>
        </div>
      )}{" "}
    </div>
  );
}

export default Header;
