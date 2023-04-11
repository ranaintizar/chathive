import React from "react";
import clsx from "clsx";

import EnterMsg from "components/enter-msg";
import Header from "components/header";
import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import FileThumbnail from "components/file-thumbnail";

import stl from "./MessagesScreen.module.scss";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

const MessagesScreen = ({ theme, messages, myId }: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const id = messages[0].recieverId;

  const downloadFile = (fileInfo: any) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var blob = xhr.response;
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = fileInfo.fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else if (xhr.status === 404) {
          console.log("File Not Found");
        } else if (xhr.status === 0) {
          console.log("Network Disconnected");
        }
      }
    };
    xhr.open("GET", fileInfo.fileUrl);
    xhr.send();
  };

  const formatBytes = (bytes: number) => {
    const KB = 1024;
    const MB = 1024 * 1024;

    if (bytes < KB) {
      return bytes + " bytes";
    } else if (bytes < MB) {
      return (bytes / KB).toFixed(2) + " KB";
    } else {
      return (bytes / MB).toFixed(2) + " MB";
    }
  };

  return (
    <div className={stl.msgScreen}>
      <Header theme={theme} shadow={true} customClass={stl.header} />
      <div className={stl.msgContainer}>
        {messages.map((msg: any, i: number) => (
          <div
            key={i}
            className={clsx(
              stl.msg,
              msg.recieverId === myId ? stl.right : stl.left
            )}
          >
            {(msg.messageType === "text" && (
              <MessageItem
                left={msg.recieverId === myId}
                content={msg.messageContent}
                theme={theme}
              />
            )) ||
              (msg.messageType === "gif" && (
                <GifPlayer src={msg.messageContent} />
              )) ||
              (msg.messageType === "file" && (
                <FileThumbnail
                  theme={theme}
                  handleOnClick={() => downloadFile(msg.fileInfo)}
                  content={formatBytes(msg.fileInfo.fileSize)}
                />
              ))}
          </div>
        ))}
      </div>
      <EnterMsg theme={theme} />
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
      senderId: "SenderId1",
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
  myId: "RecieverId1",
};

export default MessagesScreen;
