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
  setShowMsgs: (arg: Boolean) => void;
  lastMsgs: Array<any>;
  myId: string;
}

const Sidebar = ({
  theme,
  chats,
  handleChatClick,
  setShowMsgs,
  lastMsgs,
  myId,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleOptions = (item: string) => {
    if (item === "Settings") {
      console.log("Got It");
      setShowMsgs(false);
    }
  };

  return (
    <div
      className={clsx(
        stl.sidebar,
        theme === "dark" ? stl.darkSidebar : undefined
      )}
    >
      <Header
        title="Chats"
        theme={theme}
        list={["Settings", "Option 2", "Option 3", "Option 4"]}
        handleListItemClick={handleOptions}
      />
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
          {chats.map((chat, i) => (
            <ChatItem
              handleOnClick={handleChatClick}
              data={chat}
              msg={lastMsgs[i]}
              theme={theme}
              key={i}
              myId={myId}
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
          handleStartChat(chatName, setIsLoading);
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
