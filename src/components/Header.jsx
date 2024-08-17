import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cart";

const Header = () => {
  const { cart } = useCartStore();
  return (
    <header className="bg-gray-100">
      <div className="flex justify-between p-8 px-3 w-full items-center max-w-[1400px] mx-auto ">
        <Link to="/" className="font-bold text-3xl">
          <span className="text-orange-400">Merch</span>
          <span className="text-blue-600">Maze</span>
        </Link>
        <Link to="/cart" className="relative">
          {cart.length > 0 && <span className="absolute -top-3 left-2 p-2 flex items-center justify-center bg-orange-400 text-white text-md rounded-full w-5 h-5">{cart.length}</span>}{" "}
          <span className="fa-solid fa-cart-shopping text-gray-700 text-2xl"></span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
