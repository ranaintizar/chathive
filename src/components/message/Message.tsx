import React, { useEffect } from "react";
import clsx from "clsx";

import MessageItem from "components/message-item";
import GifPlayer from "components/gif-player";
import ImageDisplayer from "components/image-displayer";
import VideoDisplayer from "components/video-displayer";
import FileThumbnail from "components/file-thumbnail";

import stl from "./Message.module.scss";

interface Props {
  theme: string;
  id: string;
  index: number;
  type: string;
  content: any;
  senderId: string;
  msgId: string;
  chatId: string;
}

const Message = ({
  theme,
  content,
  type,
  senderId,
  id,
  msgId,
  index,
  chatId,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [src, setSrc] = React.useState("");

  useEffect(() => {
    setTimeout(() => {
      setSrc(content.fileURL);
    }, 1000);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return isLoading ? (
    <div></div>
  ) : (
    <div
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
  );
};

export default Message;
