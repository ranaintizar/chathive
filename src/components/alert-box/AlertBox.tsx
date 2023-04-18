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
  handleOnClick: () => void;
}

const AlertBox = ({
  visible,
  theme,
  title,
  msg,
  btnLabel,
  handleOnClick,
}: Props) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : undefined}
      transition={visible ? { type: "spring" } : { type: "tween" }}
      className={clsx(
        stl.alertBox,
        theme === "dark" ? stl.darkAlertBox : undefined
      )}
    >
      <div className={stl.text}>
        <span className={stl.title}>{title}</span>
        <span className={stl.msg}>{msg}</span>
      </div>
      <div className={stl.footer}>
        <button onClick={handleOnClick}>{btnLabel}</button>
      </div>
    </motion.div>
  );
};

AlertBox.defaultProps = {
  title: "Alert Box!",
  msg: "This is the Custom Alert Box. This is Message for this alert box.",
  btnLabel: "Okay",
  handleOnClick: () => console.log("Alert-OK button Clicked!"),
};

export default AlertBox;
