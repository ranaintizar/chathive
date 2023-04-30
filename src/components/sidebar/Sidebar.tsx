import React, { useEffect } from "react";
import clsx from "clsx";

import { handleStartChat } from "src/lib/firebaseFunctions";
import Header from "components/header";
import StartChatBtn from "components/start-chat-button";
import ChatItem from "components/chat-item/ChatItem";
import Spinner from "components/spinner";
import PromptBox from "components/prompt-box";

import stl from "./Sidebar.module.scss";

interface Props {
  theme: string;
  chats: Array<Object>;
  handleChatClick: (arg: any) => void;
}

const Sidebar = ({ theme, chats, handleChatClick }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [uid, setUID] = React.useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUID(user.uid);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div
      className={clsx(
        stl.sidebar,
        theme === "dark" ? stl.darkSidebar : undefined
      )}
    >
      <Header title="Chats" theme={theme} />
      <StartChatBtn
        customClass={stl.chatBtn}
        startChatHandler={() => setIsVisible(true)}
      />
      {isLoading ? (
        <div className={stl.loadingContainer}>
          <Spinner />
        </div>
      ) : chats.length === 0 ? (
        <div className={stl.emptySidebar}>
          Click the Chat Button to start New Chat
        </div>
      ) : (
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
      )}
      <PromptBox
        visible={isVisible}
        theme={theme}
        name="chat"
        handleCancelClick={() => setIsVisible(false)}
        handleOkClick={(chatName) => {
          setIsVisible(false);
          handleStartChat(chatName, setIsLoading, uid);
        }}
        customClass={stl.prompt}
      />
    </div>
  );
};

Sidebar.defaultProps = {
  handleChatClick: (item: any) => console.log(item),
};

export default Sidebar;
