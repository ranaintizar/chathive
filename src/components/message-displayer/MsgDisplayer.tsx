import React, { useEffect } from "react";

import EnterMsg from "components/enter-msg";
import Spinner from "components/spinner";

import stl from "./MsgDisplayer.module.scss";
import Message from "components/message/Message";

interface Props {
  messages: any;
  myId: string;
  theme: string;
}

const MsgDisplayer = ({ messages, myId, theme }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

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

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={stl.msgDisplayer}>
      <div ref={ref} className={stl.msgContainer}>
        {messages.map((msg: any, i: number) => (
          <Message theme={theme} msg={msg} index={i} id={myId} />
        ))}
      </div>
      <EnterMsg customClass={stl.enterMsg} theme={theme} />
    </div>
  );
};

export default MsgDisplayer;
