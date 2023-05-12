import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import { handleDelChat, updateChatName } from "src/lib/firebaseFunctions";
import { useOnClickOutside } from "src/lib/useClickOutside";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";
import PromptBox from "components/prompt-box";

import stl from "./Chat.module.scss";

interface Props {
  data: any;
  theme: string;
  handleOnClick: (arg: any) => void;
}

const ChatItem = ({ theme, data, handleOnClick }: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPromptVisible, setIsPromptVisible] = React.useState(false);

  const dropDownRef = React.useRef();

  const handleListItemClick = (item: string) => {
    if (item === "Delete") {
      handleDelChat(data.chatId);
    } else if (item === "Change Name") {
      setIsPromptVisible(true);
    }
  };

  useOnClickOutside(() => setShowDropdown(false), dropDownRef);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={clsx(
        stl.chatItem,
        theme === "dark" ? stl.darkChatItem : undefined
      )}
    >
      {/* <Image
        src={data.src}
        width={45}
        height={45}
        alt="profile-img"
        className={stl.avatar}
      /> */}
      <div className={stl.left}>
        <div onClick={() => handleOnClick(data)} className={stl.info}>
          <span className={stl.title}>{data.chatName}</span>
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
        transformOrigin="top right"
        top="60%"
        right="6%"
        theme={theme}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        list={["Archive", "Change Name", "Change Photo", "Delete"]}
        width={170}
        height={200}
        handleListItemClick={handleListItemClick}
      />
      <PromptBox
        visible={isPromptVisible}
        name="chat"
        handleCancelClick={() => setIsPromptVisible(false)}
        theme={theme}
        handleOkClick={(newName) => {
          setIsPromptVisible(false);
          updateChatName(newName, data.chatId);
        }}
        customClass={stl.prompt}
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
  handleOnClick: (data: any) => console.log(data),
};

export default ChatItem;
