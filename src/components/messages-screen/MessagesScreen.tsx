import React, { useEffect } from "react";
import clsx from "clsx";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/pages/api/firebase";
import Header from "components/header";
import MsgDisplayer from "components/message-displayer";
import Sidebar from "components/sidebar";

import stl from "./MessagesScreen.module.scss";
interface Props {
  theme: string;
  myId: string;
  toggleTheme: () => void;
  setShowMsgs: any;
}

const MessagesScreen = ({ theme, myId, toggleTheme, setShowMsgs }: Props) => {
  const [chats, setChats] = React.useState([]);
  const [chatId, setChatId] = React.useState("dsfasdf");
  const [title, setTitle] = React.useState("Messages");
  const [isEmpty, setIsEmpty] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      const chatsRef = collection(db, "chats");
      onSnapshot(chatsRef, (snapshot) => {
        //@ts-ignore
        let chatArray = [];
        snapshot.docs.map((doc, i) =>
          chatArray.push({
            chatName: doc.data().chatName,
            chatId: doc.id,
            message: "This is Last Message from this",
            key: i,
          })
        );
        //@ts-ignore
        setChats(chatArray);
      });
    }, 1000);
  }, [myId]);

  return (
    <div
      className={clsx(
        stl.msgScreen,
        theme === "dark" ? stl.darkMsgScreen : undefined
      )}
    >
      <Sidebar
        chats={chats}
        theme={theme}
        handleChatClick={(item) => {
          setChatId(item.chatId);
          setIsEmpty(false);
        }}
        setShowMsgs={setShowMsgs}
      />
      <Header
        title={title}
        toggleTheme={toggleTheme}
        themeBtn={true}
        theme={theme}
        titleCenter={true}
        customClass={stl.header}
      />
      <div className={stl.messages}>
        <MsgDisplayer
          theme={theme}
          myId={myId}
          chatId={chatId}
          setTitle={setTitle}
          isEmpty={isEmpty}
        />
      </div>
    </div>
  );
};

export default MessagesScreen;
