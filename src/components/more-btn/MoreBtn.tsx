import React from "react";
import clsx from "clsx";

import MoreIcon from "assets/more.svg";

import stl from "./MoreBtn.module.scss";

interface Props {
  visible: Boolean;
  theme: string;
  customClass?: string;
  handleOnClick: () => void;
}

const MoreBtn = ({ visible, theme, customClass, handleOnClick }: Props) => {
  return (
    <div
      onClick={handleOnClick}
      style={visible ? { opacity: 1 } : { opacity: 0 }}
      className={clsx(
        stl.btnContainer,
        theme === "dark" ? stl.darkBtn : undefined,
        customClass
      )}
    >
      <button className={stl.button}>
        <MoreIcon />
      </button>
    </div>
  );
};

MoreBtn.defaultProps = {
  handleOnClick: () => console.log("Clicked..."),
  visible: true,
};

export default MoreBtn;
