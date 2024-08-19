import React, { useEffect, useState } from "react";
import useCartStore from "../store/cart";
import Modal from "../components/Modal";

import Card from "../components/Card";
import { AnimatePresence, motion } from "framer-motion";
import CheckoutDetails from "../components/CheckoutDetails";

const Cart = () => {
  const { cart, addCart, decreaseQuantity, removeFromCart } = useCartStore();
  const [removeItem,setRempveItem] = useState()
  const [isOpen, setIsOpen] = useState(false);

  function handleAddItems(cartItem) {
    addCart({
      name: cartItem.name,
      id: cartItem.id,
      price: cartItem.price,
      image: cartItem.image,
      brandName: cartItem.brandName,
      discount: cartItem.discount,
      discountType: cartItem.discountType,
      coupons: cartItem.coupons,
    });
  }

  return (
    <>
      <section className=" max-w-[1400px] mx-auto gap-8  mt-8  p-5 relative">
        <h2 className="text-3xl ">Your Shopping Cart</h2>
        {cart.length == 0 && (
          <p className="my-32 text-center text-lg text-gray-400 italic">
            There is nothing in your bag. Let's add some items.
          </p>
        )}
        {cart.length > 0 && (
          <div className="flex justify-between gap-8 flex-col md:flex-row  items-start">
            <AnimatePresence>
              <motion.div className="w-full">
                {cart.map((cartItem) => (
                  <AnimatePresence>
                    <Card
                      product={cartItem}
                      key={cartItem.id}
                      imageClasses="w-[120px]  h-full "
                      classes="flex  flex-col justify-center items-center text-center md:text-left md:justify-start md:items-center md:flex-row gap-8  mt-8 border-2 p-4 relative"
                      nameClasses={'w-full'}
                    >
                      <div className=" flex justify-between mt-7 w-[130px] items-center mx-auto md:mx-0">
                        <button
                          className="p-2 w-8 h-8 flex justify-center text-white rounded-full bg-blue-400"
                          onClick={() => decreaseQuantity(cartItem.id)}
                          disabled={cartItem.quantity <= 1}
                        >
                          <span className="fa-solid fa-minus "></span>
                        </button>
                        <span className="text-xl text-gray-700">
                          {cartItem.quantity}
                        </span>
                        <button
                          className="p-2 w-8 h-8 flex justify-center text-white rounded-full bg-blue-400"
                          onClick={() => handleAddItems(cartItem)}
                          disabled={cartItem.quantity >= 10}
                        >
                          <span className="fa-solid fa-plus"></span>
                        </button>
                      </div>

                      <button
                        className="absolute block right-4 cursor-pointer top-8 lg:top-6"
                        onClick={() => {
                          setIsOpen("removeItem") 
                          setRempveItem(cartItem.id)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          className="itemContainer-base-closeIcon"
                        >
                          <path
                            fill="#656565"
                            fillRule="evenodd"
                            d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
                          ></path>
                        </svg>
                      </button>
                    </Card>
                    {isOpen == "removeItem" && (
                      <Modal
                        key="removeItem"
                        closeModal={() => setIsOpen("")}
                        isOpen={isOpen}
                      >
                        <div className="p-7">
                          <h2 className="font-bold text-lg">Remove Item</h2>
                          <p className="text-lg my-4 ">
                            Are you sure you want to remove this item?
                          </p>
                          <div className="mt-8">
                            <button
                              className="bg-red-600 p-8 py-2 text-white font-bold mr-4"
                              onClick={() => {
                                removeFromCart(removeItem);
                                setIsOpen("");
                              }}
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => setIsOpen("")}
                              className="border-2 p-8 py-2 text-gray-400 font-bold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </AnimatePresence>
                ))}
              </motion.div>
            </AnimatePresence>
            <CheckoutDetails isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
