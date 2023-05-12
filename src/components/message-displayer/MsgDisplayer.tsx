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
import { formatDate } from "src/lib";
import EnterMsg from "components/enter-msg";
import Spinner from "components/spinner";
import Message from "components/message/Message";
import EmptyScreen from "components/empty-screen";

import stl from "./MsgDisplayer.module.scss";

interface Props {
  myId: string;
  theme: string;
  chatId: string;
  setTitle: (arg: any) => void;
  isEmpty: Boolean;
}

const MsgDisplayer = ({ myId, theme, chatId, setTitle, isEmpty }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    setIsLoading(true);
    const chatsRef = collection(db, "chats");
    const chatDoc = doc(chatsRef, chatId);
    onSnapshot(chatDoc, (snapshot) => setTitle(snapshot.data()?.chatName));
    const msgRef = collection(chatDoc, "messages");
    const sortedMsgs = query(msgRef, orderBy("time", "asc"));
    onSnapshot(sortedMsgs, (snapshot) => {
      //@ts-ignore
      let msgsArray = [];
      snapshot.docs.map((doc, i) =>
        msgsArray.push({ ...doc.data(), id: doc.id, key: i })
      );
      //@ts-ignore
      setMessages(msgsArray);
      setIsLoading(false);
    });
  }, [chatId]);

  const ref = React.useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      ref.current.scrollTop = ref.current.scrollHeight;
    }, 2000);
  }, []);

  return (
    <div className={stl.msgDisplayer}>
      <div ref={ref} className={stl.msgContainer}>
        {isEmpty ? (
          <EmptyScreen />
        ) : isLoading ? (
          <div className={stl.loadingContainer}>
            <Spinner />
          </div>
        ) : messages.length === 0 ? (
          <div className={stl.noConvesation}>No Conversation Yet.</div>
        ) : (
          messages.map((msg: any, i: number) => (
            <div
              key={i}
              className={clsx(
                stl.msgInfo,
                msg.senderId !== myId && stl.msgInfoRt
              )}
            >
              <div className={stl.info}>
                {msg.senderId === myId
                  ? "You," + formatDate(msg.time)
                  : msg.username + "," + formatDate(msg.time)}
              </div>
              <Message
                theme={theme}
                type={msg.messageType}
                content={msg.messageContent}
                senderId={msg.senderId}
                index={i}
                id={myId}
                msgId={msg.id}
                chatId={chatId}
              />
            </div>
          ))
        )}
      </div>
      <EnterMsg customClass={stl.enterMsg} theme={theme} chatId={chatId} />
    </div>
  );
};

export default MsgDisplayer;
