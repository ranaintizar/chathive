import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import stl from "./AlertBox.module.scss";

interface Props {
  visible: Boolean;
  theme: string;
  title: string;
  msg: string;
  btnLabel: string;
  titleColor: string;
  cancelBtn: Boolean;
  cancelLabel: string;
  maxWidth: number;
  btnCustomClass?: string;
  handleCancel: () => void;
  handleOnClick: () => void;
}

const AlertBox = ({
  visible,
  theme,
  title,
  msg,
  btnLabel,
  titleColor,
  cancelBtn,
  cancelLabel,
  maxWidth,
  btnCustomClass,
  handleCancel,
  handleOnClick,
}: Props) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : undefined}
      transition={visible ? { type: "spring" } : { type: "tween" }}
      style={{ maxWidth: maxWidth + "px" }}
      className={clsx(
        stl.alertBox,
        theme === "dark" ? stl.darkAlertBox : undefined
      )}
    >
      <div className={stl.text}>
        <span style={{ color: titleColor }} className={stl.title}>
          {title}
        </span>
        <span className={stl.msg}>{msg}</span>
      </div>
      <div className={stl.footer}>
        {cancelBtn && (
          <button className={stl.cancelBtn} onClick={handleCancel}>
            {cancelLabel}
          </button>
        )}
        <button onClick={handleOnClick} className={btnCustomClass}>
          {btnLabel}
        </button>
      </div>
    </motion.div>
  );
};

AlertBox.defaultProps = {
  title: "Alert Box!",
  msg: "This is the Custom Alert Box. This is Message for this alert box.",
  btnLabel: "Okay",
  handleOnClick: () => console.log("Alert-OK button Clicked!"),
  cancelBtn: false,
  titleColor: "red",
  cancelLabel: "Cancel",
  handleCancel: () => console.log("Cancel Button Clicked!"),
  maxWidth: 400,
};

export default AlertBox;
