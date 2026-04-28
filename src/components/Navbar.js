import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2 className="logo">StreamList</h2>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/subscriptions">Subscriptions</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;