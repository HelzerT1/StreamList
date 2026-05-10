import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>StreamList Login</h1>
        <p>Please log in to access the StreamList system.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;