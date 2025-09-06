
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import FeaturedProductsCarousel from "./components/FeaturedProductsCarousel/FeaturedProductsCarousel";
import ProductPage from "./components/ProductPage/ProductPage";
import DetailedProductPage from "./components/DetailedProductPage/DetailedProductPage";
import Reviews from "./components/Reviews/Reviews";
import Footer from "./components/Footer/Footer";

function App() {
  const loadCartFromLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart ? storedCart : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addToCart = (product, e) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    if (e) e.stopPropagation();
  };

  const updateCartQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity + change, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    if (productId === -1) {
      setCart([]);
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Header
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateCartQuantity={updateCartQuantity}
        onClearCart={handleClearCart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              <FeaturedProductsCarousel onAddToCart={addToCart} />
              <ProductPage onAddToCart={addToCart} />
              <Reviews />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={<DetailedProductPage onAddToCart={addToCart} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
