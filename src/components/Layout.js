import React from "react";
import Navbar from "./Navbar";

function Layout({ children, cartCount }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="container">{children}</main>
    </>
  );
}

export default Layout;