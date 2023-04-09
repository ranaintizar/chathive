import React from "react";
import clsx from "clsx";

import ChatIcon from "assets/chat.svg";

import stl from "./StartChatBtn.module.scss";

const StartChatBtn = ({ startChatHandler, customClass }: any) => {
  return (
    <button
      onClick={startChatHandler}
      className={clsx(stl.chatBtn, customClass)}
    >
      <span className={stl.btnContent}>
        <ChatIcon /> Start Chat
      </span>
    </button>
  );
};

StartChatBtn.defaultProps = {
  startChatHandler: () => console.log("Chat Button Clicked..."),
};

export default StartChatBtn;
