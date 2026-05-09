import React, { useState } from "react";

function CreditCard() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [saved, setSaved] = useState(false);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardData = {
      cardName,
      cardNumber,
    };

    localStorage.setItem("creditCard", JSON.stringify(cardData));

    setSaved(true);
  };

  return (
    <section>
      <h1>Credit Card Management</h1>

      <form className="credit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name on Card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(formatCardNumber(e.target.value))
          }
          required
        />

        <button type="submit">Save Card</button>
      </form>

      {saved && (
        <p className="success-message">
          Credit card saved successfully.
        </p>
      )}
    </section>
  );
}

export default CreditCard;