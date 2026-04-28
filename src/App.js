import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Subscriptions from "./pages/Subscriptions";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
      const newItem = {
        ...product,
        quantity: 1,
      };

      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
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

  return (
    <BrowserRouter>
      <Layout cartCount={cartItems.length}>
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/subscriptions"
            element={<Subscriptions addToCart={addToCart} warning={warning} />}
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
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;