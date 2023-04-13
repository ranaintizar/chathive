import React from "react";
import clsx from "clsx";

import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import FileThumbnail from "components/file-thumbnail";
import EnterMsg from "components/enter-msg";

import stl from "./MsgDisplayer.module.scss";

const MsgDisplayer = ({ messages, myId, theme }: any) => {
  return (
    <>
      <div className={stl.msgContainer}>
        {messages.map((msg: any, i: number) => (
          <div
            key={i}
            className={clsx(
              stl.msg,
              msg.senderId === myId ? stl.right : stl.left
            )}
          >
            {(msg.messageType === "text" && (
              <MessageItem
                variant={msg.senderId !== myId ? "secondary" : "primary"}
                left={msg.senderId === myId}
                content={msg.messageContent}
                theme={theme}
              />
            )) ||
              (msg.messageType === "gif" && (
                <GifPlayer
                  left={msg.senderId === myId}
                  theme={theme}
                  src={msg.messageContent}
                />
              )) ||
              (msg.messageType === "file" && (
                <FileThumbnail
                  left={msg.senderId === myId}
                  theme={theme}
                  fileInfo={msg.fileInfo}
                />
              ))}
          </div>
        ))}
      </div>
      <EnterMsg theme={theme} />
    </>
  );
};

export default MsgDisplayer;
