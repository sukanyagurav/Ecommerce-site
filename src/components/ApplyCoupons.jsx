import React, { useEffect, useState } from "react";

import { currencyFormatter } from "../utils/utilis";
import data from "../../public/coupons";

const ApplyCoupons = ({
  totalAmount,
  closeModal,
  selectedCoupon,
  setSelectedCoupon,
}) => {
  const [bestCoupon, setBestCoupon] = useState(null);
  const [coupons, setCoupons] = useState(data);
  function calculateDiscountOnCoupons(coupon) {
    if (coupon.discountType === "percentage") {
      return totalAmount * (coupon.couponValue / 100);
    } else if (coupon.discountType === "fixed") {
      return coupon.couponValue;
    }
    return 0;
  }

  function findBestCoupon() {
    let maxDiscount = 0;
    let best = null;
    const validCoupons = coupons.filter(
      (coupon) =>   totalAmount >= coupon.minimumPrice 
    );

    validCoupons.forEach((coupon) => {
      const discount = parseInt(calculateDiscountOnCoupons(coupon));

      if (
        discount > maxDiscount &&
        new Date().getTime() <= new Date(coupon.expiraryDate).getTime() 
      ) {
        maxDiscount = discount;
        best = coupon;
      }
    });
    setBestCoupon(best);
  }

  function calculateDiscountCoupons(subTotal, couponValue, discountType) {
    if (discountType === "percentage") {
      return subTotal * (couponValue / 100);
    } else if (discountType === "fixed") {
      return couponValue;
    }
  }
  useEffect(() => {
    findBestCoupon();
  }, [totalAmount]);
  return (
    <div>
      <h2 className="p-6 uppercase ">Apply Coupon</h2>
      <div className="flex flex-col gap-8 h-[300px] overflow-y-scroll coupon_list ">
        {bestCoupon ? (
          <div className="bg-[#e4e4e4] p-6 ">
            <div className="flex items-start gap-2  ">
              <input
                type="checkbox"
                id={bestCoupon.couponCode}
                className="block mt-2 "
                onChange={(e) => {
                  e.target.checked
                    ? setSelectedCoupon(
                        calculateDiscountCoupons(
                          totalAmount,
                          bestCoupon.couponValue,
                          bestCoupon.discountType
                        )
                      )
                    : setSelectedCoupon(0);
                }}
              />
              <label
                htmlFor={bestCoupon.couponCode}
                className="p-2 border-2 border-dashed py-1 border-orange-400 text-blue-700 font-semibold"
              >
                {bestCoupon.couponCode}
              </label>
            </div>

            <p className="mt-3 text-[0.8rem] font-bold">
              Save Rs.
              {currencyFormatter.format(
                calculateDiscountCoupons(
                  totalAmount,
                  bestCoupon.couponValue,
                  bestCoupon.discountType
                )
              )}
            </p>
            <p className="text-[0.8rem]">
              {bestCoupon.discountType == "percentage"
                ? `${bestCoupon.couponValue}% OFF on minimum purchase of Rs.
              ${bestCoupon.minimumPrice}`
                : `Rs.${bestCoupon.couponValue} OFF on minimum purchase of Rs.
              ${bestCoupon.minimumPrice}`}
            </p>
            <p className="text-[0.8rem]">
              Expirary on: {bestCoupon.expiraryDate}
            </p>
          </div>
        ) : (
          <p className="italic text-gray-400 p-6 text-center">No Coupons Available...</p>
        )}
      </div>
      <div className="p-6 flex justify-between">
        <div>
          <p>Maximum savings:</p>
          <p>
            {selectedCoupon
              ? currencyFormatter.format(selectedCoupon)
              : currencyFormatter.format(0)}
          </p>
        </div>
        <button
          className="bg-orange-500 p-16 cursor-pointer text-white uppercase py-2 "
          onClick={closeModal}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ApplyCoupons;
