import React from "react";
import clsx from "clsx";

import Header from "components/header";

import stl from "./MessagesScreen.module.scss";
import MsgDisplayer from "components/message-displayer";
import EmptyScreen from "components/empty-screen";

const MessagesScreen = ({ theme, messages, myId }: any) => {
  return (
    <div
      className={clsx(
        stl.msgScreen,
        theme === "dark" ? stl.darkMsgScreen : undefined
      )}
    >
      <Header theme={theme} shadow={true} customClass={stl.header} />
      {(messages && <MsgDisplayer messages={messages} myId={myId} />) || (
        <EmptyScreen />
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
