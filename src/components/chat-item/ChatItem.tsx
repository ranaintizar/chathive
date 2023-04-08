import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

import { useOnClickOutside } from "@/src/useClickOutside";
import ProfileImage from "assets/profileImage.jpeg";
import MoreIcon from "assets/more.svg";

import stl from "./Chat.module.scss";

interface Props {
  id: string;
  data: any;
  theme: string;
  list: Array<string>;
  width: number;
  height: number;
  handleOnClick: (arg: any) => void;
  handleListItemClick: (arg: string) => void;
}

const ChatItem = ({
  list,
  theme,
  id,
  data,
  width,
  height,
  handleOnClick,
  handleListItemClick,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const dropDownRef = React.useRef();

  const handleHover = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.display = "block";
  };

  const handleBlur = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.display = "none";
  };

  useOnClickOutside(() => setShowDropdown(false), dropDownRef);

  return (
    <div
      onMouseOver={handleHover}
      onMouseOut={handleBlur}
      id={id}
      className={clsx(
        stl.chatItem,
        theme === "dark" ? stl.darkChatItem : undefined
      )}
    >
      <div className={stl.container}>
        <div className={stl.avatar}>
          <Image
            src={ProfileImage.src}
            width={50}
            height={50}
            alt="profile-img"
          />
        </div>
        <div className={stl.left}>
          <div
            onClick={() => handleOnClick(data)}
            className={clsx(
              stl.info,
              theme === "dark" ? stl.darkInfo : undefined
            )}
          >
            <span className={stl.title}>{data.displayName}</span>
            <span className={stl.message}>{data.message}</span>
          </div>
          <div className={stl.right}>
            <div
              className={clsx(
                stl.time,
                theme === "dark" ? stl.darkTime : undefined
              )}
            >
              {data.timeAgo}
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
          </div>
        </div>
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

ChatItem.defaultProps = {
  id: "this is id",
  data: {
    displayName: "Your Name",
    message: "This is Last Message from this",
    timeAgo: "25m",
  },
  list: ["Option 1", "Option 2", "Option 3", "Option 4"],
  width: 170,
  height: 200,
  handleListItemClick: (item: string) => console.log(item),
  handleOnClick: (data: any) => console.log(data),
};

export default ChatItem;
