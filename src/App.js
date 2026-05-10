import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Subscriptions from "./pages/Subscriptions";
import CreditCard from "./pages/CreditCard";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (product) => {
    const isSubscription = product.id <= 4;
    const itemInCart = cartItems.find((item) => item.id === product.id);

    if (isSubscription && itemInCart) {
      setWarning("You can only add one of each subscription.");
      return;
    }

    setWarning("");

    if (itemInCart) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, action) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          if (action === "increase") {
            return { ...item, quantity: item.quantity + 1 };
          }

          if (action === "decrease") {
            return { ...item, quantity: item.quantity - 1 };
          }
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <BrowserRouter>
      <Layout cartCount={cartCount} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />

          <Route
            path="/subscriptions"
            element={
              <Subscriptions addToCart={addToCart} warning={warning} />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />

          <Route path="/credit-card" element={<CreditCard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
