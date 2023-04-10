import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { useOnClickOutside } from "src/useClickOutside";
import ProfileImage from "assets/profileImage.jpeg";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

import stl from "./Chat.module.scss";

interface Props {
  data: any;
  theme: string;
  list: Array<string>;
  handleOnClick: (arg: any) => void;
  handleListItemClick: (arg: string) => void;
}

const ChatItem = ({
  list,
  theme,
  data,
  handleOnClick,
  handleListItemClick,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const dropDownRef = React.useRef();

  const handleHover = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useOnClickOutside(() => setShowDropdown(false), dropDownRef);

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      className={clsx(
        stl.chatItem,
        theme === "dark" ? stl.darkChatItem : undefined
      )}
    >
      <Image
        src={ProfileImage.src}
        width={45}
        height={45}
        alt="profile-img"
        className={stl.avatar}
      />
      <div className={stl.left}>
        <div
          onClick={() => handleOnClick(data)}
          className={clsx(
            stl.info,
            theme === "dark" ? stl.darkInfo : undefined
          )}
        >
          <span className={stl.title}>
            {data.displayName}{" "}
            <span
              className={clsx(
                stl.time,
                theme === "dark" ? stl.darkTime : undefined
              )}
            >
              {data.timeAgo}
            </span>
          </span>
          <span className={stl.row2}>
            <span className={stl.message}>{data.message}</span>
          </span>
        </div>
      </div>
      <MoreBtn
        visible={isVisible}
        customClass={stl.moreBtn}
        theme={theme}
        handleOnClick={() => setShowDropdown(true)}
      />
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
  data: {
    displayName: "Your Name",
    message: "This is Last Message from this",
    timeAgo: "2 Apr",
  },
  list: ["Option 1", "Option 2", "Option 3", "Option 4"],
  handleListItemClick: (item: string) => console.log(item),
  handleOnClick: (data: any) => console.log(data),
};

export default ChatItem;
