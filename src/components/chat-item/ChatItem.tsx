import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { useOnClickOutside } from "src/useClickOutside";
import ProfileImage from "assets/profileImage.jpeg";

import stl from "./Chat.module.scss";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

interface Props {
  id: string;
  data: any;
  theme: string;
  list: Array<string>;
  handleOnClick: (arg: any) => void;
  handleListItemClick: (arg: string) => void;
}

const ChatItem = ({
  list,
  theme,
  id,
  data,
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
            <MoreBtn
              theme={theme}
              handleOnClick={() => setShowDropdown(true)}
            />
          </div>
        </div>
      </div>
      <Dropdown
        top="60%"
        right="6%"
        theme={theme}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        list={list}
        width={170}
        height={200}
        handleListItemClick={(item) => {
          setShowDropdown(false);
          handleListItemClick(item);
        }}
      />
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
  handleListItemClick: (item: string) => console.log(item),
  handleOnClick: (data: any) => console.log(data),
};

export default ChatItem;
