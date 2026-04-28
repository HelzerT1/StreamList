import React from "react";
import list from "../data";

function Subscriptions({ addToCart, warning }) {
  return (
    <section>
      <h1>Subscriptions & EZTech Items</h1>
      <p>Select a subscription or add EZTech accessories to your cart.</p>

      {warning && <p className="warning-message">{warning}</p>}

      <div className="product-grid">
        {list.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.service} />

            <h3>{product.service}</h3>
            <p>{product.serviceInfo}</p>
            <p className="price">${product.price.toFixed(2)}</p>

            <button type="button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Subscriptions;