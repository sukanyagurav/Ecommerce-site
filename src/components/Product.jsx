import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cart";
import { calculateDiscount } from "../utils/utilis";
import Card from "./Card";

const Product = ({ product,handleToast }) => {
  const [isPresent, setIsPresent] = useState(false);
  const { addCart, itemInCart, cart } = useCartStore();
  const navigation = useNavigate();
  function handleCart(product) {
    setIsPresent(true);
    if (isPresent) {
      navigation("/cart");
    } else {
      addCart({
        name: product.name,
        id: product.id,
        price: +product.price,
        image: product.image,
        brandName: product.brandName,
        discount: +product.discount,
        discountType:product.discountType,
        coupons:product.coupons,
      });
      handleToast(product)
    }
  }

  useEffect(() => {
    setIsPresent(itemInCart(product.id));
  }, [isPresent]);
  return (
    <>
    <Card product={product}>

          <button
            className="mt-2 hover:bg-white hover:text-orange-400 duration-300 border-2 border-transparent hover:border-orange-300 px-3 py-2 flex gap-2 w-[150px] justify-center  items-center cursor-pointer text-[0.7rem] bg-orange-400 font-bold text-gray-100 uppercase  drop-shadow-3xl"
            onClick={() =>
              handleCart({
                ...product,
                  discountPrice: calculateDiscount(
                  product.price,
                  product.discount,
                  product.discountType
                ),
                discount: product.discount,
              })
            }
          >
            {isPresent ? <span>Go to cart</span> : <span>Add to cart</span>}
            <span className="fa-solid fa-cart-shopping"></span>
          </button>
   
      </Card>

    </>
  );
};

export default Product;
