import React from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>${item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, "decrease")
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, "increase")
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cart-total">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <Link to="/credit-card">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </section>
  );
}

export default Cart;