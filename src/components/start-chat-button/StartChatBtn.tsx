import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import ChatIcon from "assets/chat.svg";

import stl from "./StartChatBtn.module.scss";

interface Props {
  startChatHandler: () => void;
  customClass: string;
}

const StartChatBtn = ({ startChatHandler, customClass }: Props) => {
  return (
    <motion.button
      initial={{ width: 42 }}
      whileHover={{ width: 150 }}
      transition={{ type: "spring", duration: 0.1 }}
      onClick={startChatHandler}
      className={clsx(stl.chatBtn, customClass)}
    >
      <ChatIcon className={stl.icon} />
      <span>Start Chat</span>
    </motion.button>
  );
};

StartChatBtn.defaultProps = {
  startChatHandler: () => console.log("Chat Button Clicked..."),
};

export default StartChatBtn;
