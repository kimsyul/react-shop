import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Products from "../views/Products";
import Cart from "../views/Cart";
import Fashion from "../views/Fashion";
import Accessory from "../views/Accessory";
import Grocery from "../views/Grocery";
import Digital from "../views/Digital";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/accessory" element={<Accessory />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/digital" element={<Digital />} />
    </Routes>
  );
};

export default memo(Router);
