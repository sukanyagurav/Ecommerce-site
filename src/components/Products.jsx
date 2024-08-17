
import Product from "./Product";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useFetchProducts from "../hooks/useFetchProducts";
import Loader from "./Loader";
const Products = () => {
  const {products,loading,error} = useFetchProducts()

  function handleToast(product) {
    toast.custom((t) => (
      <div className="bg-[#FCFCFC] p-4 w-[350px] drop-shadow-xl">
        <div className="flex gap-2 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[50px] h-[50px] drop-shadow-2xl"
          />
          <span className="w-[250px] font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
            {product.name}
          </span>
        </div>
        <Link
          to="/cart"
          className="mt-3 block p-2 bg-orange-500 font-semibold uppercase w-[150px] cursor-pointer text-[0.7rem] text-white text-center ml-auto hover:bg-white hover:text-orange-400 duration-300 border-2 border-transparent hover:border-orange-300"
        >
          Added To Cart
        </Link>
      </div>
    ));
  }
  return (
    <>
      <Toaster
        expand={true}
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      <AnimatePresence>
        <motion.div
          className="flex flex-wrap max-w-[1300px] mx-auto gap-8 items-center  my-8 justify-center md:justify-evenly lg:justify-between p-5"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        > 
          {loading && <Loader/>}
          {error && <div className="flex justify-center items-center flex-col w-full gap-4">
            <p className="text-lg  text-gray-500 italic">{error}</p>
            <img src='./sad.svg' alt=""  className="w-[50px] h-[50px]"/>
          </div>}
          {!loading && !error && products &&
            products.map((product) => (
              <Product
                product={product}
                key={product.id}
                handleToast={handleToast}
              />
            ))}

          {error && <p>{error.message}</p>}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Products;
