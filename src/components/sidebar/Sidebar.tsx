import React from "react";

import stl from "./Sidebar.module.scss";
import Header from "components/header";
import StartChatBtn from "components/start-chat-button";
import ChatItem from "components/chat-item/ChatItem";

const Sidebar = ({ theme }: any) => {
  let chatArray = [];
  for (let i = 0; i < 30; i++) {
    chatArray.push(<ChatItem theme={theme} key={i} />);
  }

  return (
    <div className={stl.sidebar}>
      <Header theme={theme} shadow={true} />
      <StartChatBtn customClass={stl.chatBtn} />
      <div className={stl.chatContainer}>{chatArray.map((chat) => chat)}</div>
    </div>
  );
};

export default Sidebar;
