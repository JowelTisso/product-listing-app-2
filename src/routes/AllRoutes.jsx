import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../pages/cart/Cart";
import ProductListing from "../pages/product/ProductListing";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AllRoutes;
