import React from "react";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
const Modal = ({ closeModal, children, isOpen }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          className="absolute bg-[rgba(0,0,0,0.39)] top-0 left-0 bottom-0 w-full h-full z-10 "
          onClick={closeModal}
        ></div>
      )}
      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed top-[20%] bg-white text-black z-20  drop-shadow-2xl w-full md:w-[450px]"
        open={isOpen}
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
