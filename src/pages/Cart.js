import React from "react";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section>
      <h1>Cart</h1>
      <p>Review your selected subscriptions and EZTech items.</p>

      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.service} />

                <div className="cart-info">
                  <h3>{item.service}</h3>
                  <p>{item.serviceInfo}</p>
                  <p>${item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, "decrease")}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, "increase")}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </section>
  );
}

export default Cart;