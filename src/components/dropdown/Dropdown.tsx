import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { useOnClickOutside } from "src/lib/useClickOutside";

import stl from "./Dropdown.module.scss";

interface Props {
  theme: string;
  width: number;
  height: number;
  list: Array<string>;
  top: string;
  left: string;
  bottom: string;
  right: string;
  showDropdown: Boolean;
  setShowDropdown: any;
  transformOrigin?: string;
  handleListItemClick: (arg: string) => void;
}

const Dropdown = ({
  theme,
  width,
  height,
  list,
  top,
  left,
  bottom,
  right,
  showDropdown,
  setShowDropdown,
  transformOrigin,
  handleListItemClick,
}: Props) => {
  const ref = React.useRef();

  useOnClickOutside(() => setShowDropdown(false), ref);

  return (
    <motion.div
      //@ts-ignore
      ref={ref}
      style={{
        transformOrigin: transformOrigin,
        width: width + "px",
        height: height + "px",
        top,
        left,
        bottom,
        right,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={showDropdown ? { scale: 1, opacity: 1 } : undefined}
      transition={showDropdown ? { type: "spring" } : { type: "tween" }}
      className={clsx(
        stl.dropDown,
        theme === "dark" ? stl.darkDropdown : undefined
      )}
    >
      {list.map((item: string, i: number) => (
        <span
          key={i}
          onClick={() => {
            handleListItemClick(item);
            setShowDropdown(false);
          }}
          className={stl.dropDownItem}
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
};

Dropdown.defaultProps = {
  list: ["Option 1", "Option 2", "Option 3", "Option 4"],
  width: 170,
  height: 200,
  top: "",
  left: "",
  bottom: "",
  right: "",
  handleListItemClick: (item: string) => console.log(item),
};

export default Dropdown;
