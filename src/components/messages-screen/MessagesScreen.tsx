import React from "react";
import Image from "next/image";
import clsx from "clsx";

import EnterMsg from "components/enter-msg";
import Header from "components/header";
import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import FileThumbnail from "components/file-thumbnail";

import stl from "./MessagesScreen.module.scss";

const MessagesScreen = ({ theme, messages, myId }: any) => {
  return (
    <div
      className={clsx(
        stl.msgScreen,
        theme === "dark" ? stl.darkMsgScreen : undefined
      )}
    >
      <Header theme={theme} shadow={true} customClass={stl.header} />
      {(messages && (
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
      )) || (
        <div className={stl.emptyScreen}>
          <Image
            priority
            src="/empty-chat.png"
            width={300}
            height={300}
            alt="Empty-Screen"
          />
          <h2>Select a chat from sidebar to view messages</h2>
        </div>
      )}
    </div>
  );
};

MessagesScreen.defaultProps = {
  messages: [
    {
      messageType: "text",
      messageContent: "This is Text Message.",
      recieverId: "RecieverId1",
      senderId: "SenderId1",
    },
    {
      messageType: "gif",
      messageContent:
        "https://media0.giphy.com/media/37XQkomo1PbKzFsLYP/giphy-downsized-small.mp4?cid=7fd8f1f4twpo34dsupsq7hc1ebzunqo0x4tq73x78jhwe938&rid=giphy-downsized-small.mp4&ct=g",
      recieverId: "RecieverId1",
      senderId: "SenderId2",
    },
    {
      messageType: "file",
      messageContent: "File Url",
      recieverId: "RecieverId1sss",
      senderId: "SenderId1",
      fileInfo: {
        fileName: "logoIcon",
        fileSize: 6177,
        fileType: "image/svg+xml",
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/airy-shadow-364605.appspot.com/o/files%2FlogoIcon.svg?alt=media&token=3c533811-c046-477b-bd44-ec40396e0d8c",
      },
    },
  ],
  myId: "SenderId1",
};

export default MessagesScreen;
