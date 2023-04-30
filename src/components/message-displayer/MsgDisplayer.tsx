import React, { useEffect } from "react";

import EnterMsg from "components/enter-msg";
import Spinner from "components/spinner";
import Message from "components/message/Message";

import stl from "./MsgDisplayer.module.scss";

interface Props {
  messages: any;
  myId: string;
  theme: string;
  chatId: string;
  isLoading: Boolean;
  setIsLoading: any;
}

const MsgDisplayer = ({
  messages,
  myId,
  theme,
  chatId,
  isLoading,
  setIsLoading,
}: Props) => {
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [isLoading]);

  const ref = React.useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      ref.current.scrollTop = ref.current.scrollHeight;
    }, 1500);
  }, []);

  return (
    <div className={stl.msgDisplayer}>
      <div ref={ref} className={stl.msgContainer}>
        {isLoading ? (
          <div className={stl.loadingContainer}>
            <Spinner />
          </div>
        ) : messages.length === 0 ? (
          <div className={stl.noConvesation}>No Conversation Yet.</div>
        ) : (
          messages.map((msg: any, i: number) => (
            <Message
              theme={theme}
              type={msg.messageType}
              content={msg.messageContent}
              senderId={msg.senderId}
              time={msg.time}
              index={i}
              id={myId}
              msgId={msg.id}
              chatId={chatId}
            />
          ))
        )}
      </div>
      <EnterMsg customClass={stl.enterMsg} theme={theme} chatId={chatId} />
    </div>
  );
};

export default MsgDisplayer;
