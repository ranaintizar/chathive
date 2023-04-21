import React from "react";
import clsx from "clsx";

import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import ImageDisplayer from "components/image-displayer";
import VideoDisplayer from "components/video-displayer";
import FileThumbnail from "components/file-thumbnail";
import Tooltip from "components/tooltip";

import stl from "./Message.module.scss";

interface Props {
  theme: string;
  msg: any;
  id: string;
  index: number;
}

const Message = ({ theme, msg, id, index }: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const formatedTime = (date: any) => {
    const now = new Date();
    //@ts-ignore
    const diffMs = now - date;

    // less than an hour ago
    if (diffMs < 60 * 60 * 1000) {
      const diffMins = Math.floor(diffMs / 60000);
      return `${diffMins} minutes ago`;
    }

    // today's date
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }

    // yesterday's date
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    // before yesterday's date
    const dateStr = date.toDateString();
    return `${dateStr.substr(4, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  };

  //@ts-ignore
  let timeoutId;
  //@ts-ignore
  let lastMouseX, lastMouseY;

  const handleShowTooltip = () => {
    timeoutId = setTimeout(() => {
      setShowTooltip(true);
    }, 1000);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const handlePosition = (e: any) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setX(mouseX);
    setY(mouseY);
    //@ts-ignore
    if (lastMouseX !== mouseX || lastMouseY !== mouseY) {
      setShowTooltip(false);
      //@ts-ignore
    } else {
      handleShowTooltip();
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  };

  const handleHideTooltip = () => {
    setShowTooltip(false);
    //@ts-ignore
    clearTimeout(timeoutId);
  };

  return (
    <>
      <div
        onMouseEnter={handleShowTooltip}
        onMouseMove={handlePosition}
        onMouseLeave={handleHideTooltip}
        key={index}
        className={clsx(stl.msg, msg.senderId === id ? stl.right : stl.left)}
      >
        {(msg.messageType === "text" && (
          <MessageItem
            variant={msg.senderId !== id ? "secondary" : "primary"}
            left={msg.senderId === id}
            content={msg.messageContent}
            theme={theme}
          />
        )) ||
          (msg.messageType === "gif" && (
            <GifPlayer
              left={msg.senderId === id}
              theme={theme}
              src={msg.messageContent}
            />
          )) ||
          (msg.messageType === "file" &&
            ((msg.fileInfo.fileType.includes("image") && (
              <ImageDisplayer
                swap={msg.senderId === id}
                src={msg.fileInfo.fileUrl}
                theme={theme}
              />
            )) ||
              (msg.fileInfo.fileType.includes("video") && (
                <VideoDisplayer
                  swap={msg.senderId === id}
                  theme={theme}
                  src={msg.fileInfo.fileUrl}
                  type={msg.fileInfo.fileType}
                />
              )) || (
                <FileThumbnail
                  left={msg.senderId === id}
                  theme={theme}
                  fileInfo={msg.fileInfo}
                />
              ))) ||
          undefined}
      </div>
      <Tooltip
        theme={theme}
        visible={showTooltip}
        top={y}
        left={x}
        content={formatedTime(msg.time)}
      />
    </>
  );
};

export default Message;
