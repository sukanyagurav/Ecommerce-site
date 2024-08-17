import React, { useEffect, useState } from "react";
import axios from "axios";
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [coupons,setCoupons] = useState([])
  async function fetchProducts() {
    axios
      .get("./data.json")
      .then((res) => {
        setProducts(res.data.products);
        
      })
      .catch((err) => {

        setError("Something went wrong, Please try again after sometime")
      }).finally(()=>{
        setLoading(false)
      })
  }

  async function fetchCoupons(){
    axios
    .get("./coupons.json")
    .then((res) => {
      setLoading(true)
      setCoupons(res.data.coupons);

    })
    .catch((err) => {

      setError("Something went wrong, Please try again after sometime")
    }).finally(()=>{
      setLoading(false)
    })
  }
  useEffect(()=>{
    fetchProducts()
    fetchCoupons()
  },[])
  return {
    products,
    loading,
    coupons,
    error
  }
};

export default useFetchProducts;
