export function calculateDiscount(price, discount, discountType) {
  let discountPrice;
  if (discountType == "price") {
    discountPrice = price - discount;
    return discountPrice;
  } else {
    discountPrice = Math.round(price * (discount / 100));
    return Math.round(price - discountPrice);
  }
}

export function calculateTotalMRP(prices) {
  return prices?.reduce((curItem, acc) => curItem + acc, 0);
}

export function calculateDiscountOnMRP(prices) {
  return Math.ceil(
    prices
      ?.map((item) => {
        if (item.discountType == "price") {
          return item.discount ;
        } else {
          return item.price * (item.discount / 100);
        }
      })
      ?.reduce((curItem, acc) => curItem + acc, 0)
  );
}

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});
