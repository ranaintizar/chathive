import React, { useEffect } from "react";
import clsx from "clsx";

import { formatDate } from "src/lib";
import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import ImageDisplayer from "components/image-displayer";
import VideoDisplayer from "components/video-displayer";
import FileThumbnail from "components/file-thumbnail";
import Tooltip from "components/tooltip";

import stl from "./Message.module.scss";

interface Props {
  theme: string;
  id: string;
  index: number;
  type: string;
  content: any;
  time: string;
  senderId: string;
  msgId: string;
  chatId: string;
}

const Message = ({
  theme,
  content,
  type,
  time,
  senderId,
  id,
  msgId,
  index,
  chatId,
}: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [src, setSrc] = React.useState("");
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSrc(content.fileURL);
    }, 1000);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

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

  return isLoading ? (
    <div></div>
  ) : (
    <>
      <div
        // onMouseEnter={handleShowTooltip}
        // onMouseMove={handlePosition}
        // onMouseLeave={handleHideTooltip}
        key={index}
        className={clsx(stl.msg, senderId === id ? stl.right : stl.left)}
      >
        {(type === "text" && (
          <MessageItem
            variant={senderId !== id ? "secondary" : "primary"}
            left={senderId === id}
            content={content}
            theme={theme}
            msgId={msgId}
            chatId={chatId}
          />
        )) ||
          (type === "gif" && (
            <GifPlayer
              left={senderId === id}
              theme={theme}
              src={content}
              msgId={msgId}
              chatId={chatId}
            />
          )) ||
          (type === "file" &&
            ((content.fileType.includes("image") && (
              <ImageDisplayer
                swap={senderId === id}
                src={src}
                theme={theme}
                msgId={msgId}
                chatId={chatId}
                fileInfo={content}
              />
            )) ||
              (content.fileType.includes("video") && (
                <VideoDisplayer
                  swap={senderId === id}
                  theme={theme}
                  src={src}
                  msgId={msgId}
                  chatId={chatId}
                  fileInfo={content}
                  type={content.fileType}
                />
              )) || (
                <FileThumbnail
                  left={senderId === id}
                  theme={theme}
                  fileInfo={content}
                />
              ))) ||
          undefined}
      </div>
      <Tooltip
        theme={theme}
        visible={showTooltip}
        top={y}
        left={x}
        content={formatDate(time)}
      />
    </>
  );
};

export default Message;
