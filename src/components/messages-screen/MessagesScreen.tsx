import React from "react";
import clsx from "clsx";

import Header from "components/header";
import MsgDisplayer from "components/message-displayer";
import EmptyScreen from "components/empty-screen";

import stl from "./MessagesScreen.module.scss";

interface Props {
  theme: string;
  messages: Array<Object>;
  myId: string;
}

const MessagesScreen = ({ theme, messages, myId }: Props) => {
  return (
    <div
      className={clsx(
        stl.msgScreen,
        theme === "dark" ? stl.darkMsgScreen : undefined
      )}
    >
      <Header theme={theme} customClass={stl.header} />
      {(messages && (
        <MsgDisplayer theme={theme} messages={messages} myId={myId} />
      )) || <EmptyScreen />}
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
    {
      messageType: "file",
      recieverId: "RecieverId1sss",
      senderId: "SenderId111",
      fileInfo: {
        fileName: "Hi",
        fileSize: 202640,
        fileType: "video/mp4",
        fileUrl:
          "https://firebasestorage.googleapis.com/v0/b/airy-shadow-364605.appspot.com/o/files%2Fvideo-1639686692.mp4?alt=media&token=df5228a4-cb14-4d8e-a135-bf4d5e92b8a2",
      },
    },
  ],
  myId: "SenderId1",
};

export default MessagesScreen;
