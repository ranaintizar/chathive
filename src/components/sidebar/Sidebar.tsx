import React, { useEffect } from "react";
import clsx from "clsx";

import Header from "components/header";
import StartChatBtn from "components/start-chat-button";
import ChatItem from "components/chat-item/ChatItem";
import Spinner from "components/spinner";

import stl from "./Sidebar.module.scss";

interface Props {
  theme: string;
  chats: Array<Object>;
  handleChatClick: (arg: any) => void;
}

const Sidebar = ({ theme, chats, handleChatClick }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return isLoading ? (
    <div className={stl.loadingContainer}>
      <Spinner />
    </div>
  ) : (
    <div
      className={clsx(
        stl.sidebar,
        theme === "dark" ? stl.darkSidebar : undefined
      )}
    >
      <Header title="Chats" theme={theme} />
      <StartChatBtn customClass={stl.chatBtn} />
      <div className={stl.chatContainer}>
        {chats.map((chat) => (
          <ChatItem
            handleOnClick={handleChatClick}
            data={chat}
            theme={theme}
            //@ts-ignore
            key={chat.key}
          />
        ))}
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  handleChatClick: (item: any) => console.log(item),
};

export default Sidebar;
