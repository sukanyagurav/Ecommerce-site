import React, { useState } from "react";
import { calculateDiscount, currencyFormatter } from "../utils/utilis";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";

const fadeInAnimation = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};
const Card = ({ product, children, classes, imageClasses ,nameClasses }) => {
  const [imageLoad, setImageLoad] = useState(true);

  return (
    <motion.article
      variants={fadeInAnimation}
      initial="initial"
      animate="animate"
      key={product.id}
      className={`transition-all duration-300 ${classes}`}
      custom={product.id}
    >
      <div
        className={`max-w-full h-[300px]  hover:drop-shadow-xl relative overflow-hidden ${imageClasses}`}
      >
        <div
          className={`item_image w-full h-full ${
            imageLoad ? "block" : "hidden"
          }`}
        ></div>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full  h-full hover:scale-[1.2] transition-all duration-500 ${
            imageLoad ? "hidden" : "block"
          } `}
          onLoad={() => setImageLoad(false)}
        />

        {product.ratings && (
          <span className="absolute flex gap-3 items-center bottom-3 left-4 p-3 py-1 bg-white font-bold text-[0.8rem]">
            {product.ratings}
            <span className="fa-solid fa-star block text-green-700"></span>
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <Link>
          <h2 className="font-bold text-gray-500">{product.brandName} </h2>
          <h3 className={`w-[250px]  overflow-hidden whitespace-nowrap ${nameClasses}`}>
            <span className="border-b-2 border-transparent inline-block hover:border-b-gray-500">
              {product.name}
            </span>
          </h3>
        </Link>

        <span className="">
          <span className="text-[1.3rem] font-bold mr-2">
            {currencyFormatter.format(
             product.calculatedDiscountPrice ? product.calculatedDiscountPrice : calculateDiscount(product.price, product.discount,product.discountType)
            )}
          </span>
          <span className="text-gray-500 line-through mr-2">
            {currencyFormatter.format(product.price)}
          </span>
          <span className="text-orange-500 font-semibold">
             {product.discountType == 'price' ? `₹ ${product.discount}` : `${product.discount}%`} OFF
          </span>
        </span>
        {children}
      </div>
    </motion.article>
  );
};

export default Card;
