import React, { useEffect, useState } from "react";
import axios from "axios";
const useFetchCoupons = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [bestCoupon, setBestCoupon] = useState(null);

  async function fetchCoupons() {
    try{
        const res = await axios.get('./coupons.json')
  
        setCoupons(res.data.coupons)

    }catch(err){

    }finally{
        setLoading(false)
    }

  }

 useEffect(()=>{
  fetchCoupons()
 },[])
  return {
    loading,
    coupons,
    error,
    bestCoupon,
  };
};

export default useFetchCoupons;
