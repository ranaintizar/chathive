import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import SuccessIcon from "assets/success.svg";
import FailIcon from "assets/fail.svg";

import stl from "./Toast.module.scss";

interface Props {
  theme: string;
  variant: "success" | "failed";
  text: string;
  isVisible: Boolean;
  handleClose: any;
}

const Toast = ({ theme, variant, text, isVisible, handleClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000, zIndex: 0 }}
      animate={
        isVisible
          ? { opacity: 1, x: 0, zIndex: 100 }
          : { opacity: 0, x: 1000, zIndex: 0 }
      }
      transition={{ type: "teen" }}
      className={clsx(
        stl.toast,
        theme === "dark" ? stl.darkToast : undefined,
        theme === "dark" ? stl[`${variant}Dark`] : stl[`${variant}Light`]
      )}
      role="alert"
    >
      <div className={stl.iconContainer}>
        {variant === "success" ? <SuccessIcon /> : <FailIcon />}
        <span className={stl.srOnly}>Check icon</span>
      </div>
      <div className={stl.text}>{text}</div>
      <button
        type="button"
        className={stl.button}
        aria-label="Close"
        onClick={handleClose}
      >
        <span className={stl.srOnly}>Close</span>
        <svg
          aria-hidden="true"
          className={stl.icon}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </motion.div>
  );
};

export default Toast;
