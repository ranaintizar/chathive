import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { useOnClickOutside } from "@/src/useClickOutside";
import MoreIcon from "assets/more.svg";

import stl from "./MessageItem.module.scss";

interface Props {
  variant: string;
  content: string;
  theme: string;
  width: number;
  height: number;
  list: Array<string>;
  handleListItemClick: (arg: string) => void;
}

const MessageItem = ({
  theme,
  variant,
  content,
  width,
  height,
  list,
  handleListItemClick,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const dropDownRef = React.useRef();

  const handleHover = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.opacity = "1";
  };

  const handleBlur = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.opacity = "0";
  };

  useOnClickOutside(() => setShowDropdown(false), dropDownRef);

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      className={stl.container}
    >
      <div
        style={
          variant === "primary"
            ? { background: "#1e90ff" }
            : theme === "dark"
            ? { background: " #303030" }
            : { background: "#f1f1f1" }
        }
        className={stl.msgItem}
      >
        <span
          style={
            variant === "primary"
              ? { color: "#fff" }
              : theme === "dark"
              ? { color: "#fff" }
              : { color: "#000" }
          }
          className={stl.message}
        >
          {content}
        </span>
      </div>
      <div
        id="more-btn"
        onClick={() => setShowDropdown(true)}
        className={clsx(
          stl.btnContainer,
          theme === "dark" ? stl.darkBtn : undefined
        )}
      >
        <button className={stl.button}>
          <MoreIcon />
        </button>
      </div>
      <motion.div
        //@ts-ignore
        ref={dropDownRef}
        style={{
          transformOrigin: "top right",
          width: width + "px",
          height: height + "px",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          showDropdown ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 1 }
        }
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
    </div>
  );
};

MessageItem.defaultProps = {
  variant: "primary",
  list: ["Option 1", "Option 2"],
  width: 130,
  height: 110,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id libero non velit ultricies sodales. Donec eget ultricies sapien. Aliquam erat volutpat. Donec ut est nibh. Fusce dapibus ante non libero cursus auctor. Etiam dictum ipsum a enim viverra sollicitudin. Sed eu diam ex. Aliquam quis velit ut elit vestibulum ultricies vel quis elit. Sed aliquam risus eget ligula fringilla, eu rutrum velit bibendum. Nam volutpat ante vitae nulla bibendum, ac tincidunt nibh lobortis.",
  handleListItemClick: (item: string) => console.log(item),
};

export default MessageItem;
