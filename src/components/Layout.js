import React from "react";
import Navbar from "./Navbar";

function Layout({ children, cartCount, handleLogout }) {
  return (
    <>
      <Navbar cartCount={cartCount} handleLogout={handleLogout} />
      <main className="container">{children}</main>
    </>
  );
}

export default Layout;