import React, { useEffect } from "react";
import clsx from "clsx";
import {
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { makeToastEmpty } from "src/lib/firebaseFunctions";
import { db } from "@/pages/api/firebase";
import Header from "components/header";
import MsgDisplayer from "components/message-displayer";
import Sidebar from "components/sidebar";
import Toast from "components/toast";

import stl from "./MessagesScreen.module.scss";
interface Props {
  theme: string;
  myId: string;
  toggleTheme: () => void;
  setShowMsgs: any;
  toastMsg: any;
}

const MessagesScreen = ({
  theme,
  myId,
  toggleTheme,
  setShowMsgs,
  toastMsg,
}: Props) => {
  const [chats, setChats] = React.useState([]);
  const [chatId, setChatId] = React.useState("dsfasdf");
  const [title, setTitle] = React.useState("Messages");
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [lastMsgs, setLastMsgs] = React.useState([]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");
    onSnapshot(chatsRef, (snapshot) => {
      //@ts-ignore
      let chatArray = [];
      //@ts-ignore
      let lastMessages = [];
      snapshot.docs.map((chat, i) => {
        const chatRef = doc(chatsRef, chat.id);
        const msgsRef = collection(chatRef, "messages");
        const sortedMsgs = query(msgsRef, orderBy("time", "asc"), limit(1));
        onSnapshot(sortedMsgs, (snapshot) => {
          snapshot.docs.map((msg) => {
            lastMessages.push(msg.data());
          });
        });
        chatArray.push({
          chatName: chat.data().chatName,
          chatId: chat.id,
        });
      });
      //@ts-ignore
      setChats(chatArray);
      //@ts-ignore
      setLastMsgs(lastMessages);
    });
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
        lastMsgs={lastMsgs}
        theme={theme}
        myId={myId}
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
      <Toast
        theme={theme}
        variant={toastMsg?.variant}
        text={toastMsg?.text}
        isVisible={toastMsg?.text !== ""}
        handleClose={makeToastEmpty}
      />
    </div>
  );
};

export default MessagesScreen;
