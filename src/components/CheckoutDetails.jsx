import React, { useState } from "react";
import useCartStore from "../store/cart";
import {
  calculateDiscountOnMRP,
  calculateTotalMRP,
  currencyFormatter,
} from "../utils/utilis";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import ApplyCoupons from "./ApplyCoupons";
const platformFee = 20;

const CheckoutDetails = ({ isOpen, setIsOpen }) => {
  const { cart, removeAll } = useCartStore();
  const [selectedCoupon, setSelectedCoupon] = useState();
  const totalMRP = parseInt(
    calculateTotalMRP(cart?.map((items) => items?.price))
  );
  const totalDiscountOnMRP = calculateDiscountOnMRP(
    cart?.map((item) => ({
      price: item?.price,
      discount: item?.discount,
      discountType: item?.discountType,
    }))
  );
  let totalAmount = totalMRP - totalDiscountOnMRP + platformFee


  return (
    <>
      <section className="w-full md:w-[600px] p-4 border-2 mt-8">
        <h2 className="uppercase text-md font-bold">
          Price details (
          {cart.length > 1 ? `${cart.length} Items` : `${cart.length} Item`})
        </h2>
        <p className="flex justify-between mt-4">
          <span>Total MRP</span>
          <span className="font-semibold">
            {currencyFormatter.format(totalMRP)}
          </span>
        </p>
        <p className="flex justify-between mt-4">
          <span>Discount on MRP</span>
          <span className="text-green-500 font-semibold">
            - {currencyFormatter.format(totalDiscountOnMRP)}
          </span>
        </p>
        <p className="flex justify-between mt-4">
          <span>Coupon Discount</span>
        {selectedCoupon ? <div className="flex gap-2 items-center">
          <span className="text-green-500 font-semibold">-{currencyFormatter.format(selectedCoupon)}</span>
          <button onClick={() => {setIsOpen("applyCoupon")
          setSelectedCoupon(0)
          }}><span className="fa-solid text-orange-400 fa-pen"></span></button>
        </div> :  <button onClick={() => setIsOpen("applyCoupon")}>Add Coupon</button>}
        </p>
        <p className="flex justify-between mt-4">
          <span>Platform Fee</span>
          <span className="font-semibold">{platformFee}</span>
        </p>

        <p className="flex justify-between mt-4">
          <span>Shipping Fee</span>
          <span className="text-green-500 font-semibold">FREE</span>
        </p>

        <p className="flex justify-between mt-4 border-t-2 pt-4 font-bold text-lg">
          <span>Total Amount</span>
          <span>{selectedCoupon ? currencyFormatter.format(totalAmount - selectedCoupon) :  currencyFormatter.format(totalAmount)}</span>
        </p>
        <button
          className="p-4 uppercase transition-all duration-300  font-semibold hover:opacity-[0.7] bg-blue-500 mt-4 mb-2 text-white w-full "
          onClick={() => setIsOpen("checkout")}
        >
          Place Order
        </button>
      </section>
      <AnimatePresence>
        {isOpen == "checkout" && (
          <Modal
            key="checkout"
            closeModal={() => {
              setIsOpen("");
              removeAll();
            }}
            isOpen={isOpen}
          >
            <h2 className="font-bold text-lg italic p-4">
              Thanks you for your order!
            </h2>
            <p className="text-lg text-gray-400 italic p-4">
              Your order has been successfully placed and will be delivered
              shortly.
            </p>
            <button
              onClick={() => {
                setIsOpen("");
                removeAll();
              }}
              className="border-2 p-8 py-2 bg-blue-400 text-white font-bold m-4"
            >
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen == "applyCoupon" && (
          <Modal
            key="applyCoupon"
            closeModal={() => {
              setIsOpen("");
            }}
            isOpen={isOpen}
          >
            <ApplyCoupons
            closeModal={() => {
              setIsOpen("");
            }}
              
              totalAmount={totalMRP - totalDiscountOnMRP + platformFee} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheckoutDetails;
