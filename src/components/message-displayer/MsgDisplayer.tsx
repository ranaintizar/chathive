import React from "react";
import clsx from "clsx";

import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import EnterMsg from "components/enter-msg";
import ImageDisplayer from "components/image-displayer";
import VideoDisplayer from "components/video-displayer";
import FileThumbnail from "components/file-thumbnail";

import stl from "./MsgDisplayer.module.scss";

interface Props {
  messages: any;
  myId: string;
  theme: string;
}

const MsgDisplayer = ({ messages, myId, theme }: Props) => {
  return (
    <div className={stl.msgDisplayer}>
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
              (msg.messageType === "file" &&
                ((msg.fileInfo.fileType.includes("image") && (
                  <ImageDisplayer
                    swap={msg.senderId === myId}
                    src={msg.fileInfo.fileUrl}
                    theme={theme}
                  />
                )) ||
                  (msg.fileInfo.fileType.includes("video") && (
                    <VideoDisplayer
                      swap={msg.senderId === myId}
                      theme={theme}
                      src={msg.fileInfo.fileUrl}
                      type={msg.fileInfo.fileType}
                    />
                  )) || (
                    <FileThumbnail
                      left={msg.senderId === myId}
                      theme={theme}
                      fileInfo={msg.fileInfo}
                    />
                  ))) ||
              undefined}
          </div>
        ))}
      </div>
      <EnterMsg customClass={stl.enterMsg} theme={theme} />
    </div>
  );
};

export default MsgDisplayer;
