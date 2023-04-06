import React from "react";
import Image from "next/image";

import ProfileImage from "assets/profileImage.jpeg";

import stl from "./Chat.module.scss";

interface Props {
  id: string;
  data: any;
  badge: number;
  handleOnClick: (arg: any) => void;
}

const ChatItem = ({ id, handleOnClick, data, badge }: Props) => {
  const [theme, setTheme] = React.useState("dark");

  const handleHover = () => {
    const ele = document.getElementById(id);
    if (theme === "dark") {
      //@ts-ignore
      ele.style.background = "#333";
      //@ts-ignore
      ele.style.boxShadow = "none";
    } else {
      // @ts-ignore
      ele.style.background = "#f5f5f5";
      // @ts-ignore
      ele.style.boxShadow = "inset 0 0 10px 3px #f1f1f1";
    }
  };

  const handleBlur = () => {
    const ele = document.getElementById(id);
    //@ts-ignore
    ele.style.background = "none";
    //@ts-ignore
    ele.style.boxShadow = "none";
  };

  return (
    <div
      onMouseOver={handleHover}
      onMouseOut={handleBlur}
      onClick={() => handleOnClick(data)}
      id={id}
      className={stl.chatItem}
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
          <div className={stl.info}>
            <span
              style={
                theme === "dark" ? { color: "#f5f5f5" } : { color: "#16161a" }
              }
              className={stl.title}
            >
              {data.displayName}
            </span>
            <span
              style={
                theme === "dark" ? { color: "#ccc" } : { color: "#16161a" }
              }
              className={stl.message}
            >
              {data.message}
            </span>
          </div>
          <div className={stl.right}>
            <div
              style={
                theme === "dark" ? { color: "#ccc" } : { color: "#16161a" }
              }
              className={stl.time}
            >
              {data.timeAgo}
            </div>
            {badge && <div className={stl.badge}>{badge}</div>}
          </div>
        </div>
      </div>
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
  handleOnClick: (data: any) => console.log(data),
  badge: 7,
};

export default ChatItem;
