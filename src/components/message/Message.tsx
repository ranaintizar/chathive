import React, { useEffect } from 'react'
import clsx from 'clsx'

import MessageItem from 'components/message-item'
import GifPlayer from 'components/gif-player'
import ImageDisplayer from 'components/image-displayer'
import VideoDisplayer from 'components/video-displayer'
import FileThumbnail from 'components/file-thumbnail'

import stl from './Message.module.scss'

interface Props {
  theme: string
  id: string
  index: number
  type: string
  content: any
  senderId: string
  msgId: string
  chatId: string
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
}: Props) => (
  <div
    key={index}
    className={clsx(stl.msg, senderId === id ? stl.right : stl.left)}
  >
    {(type === 'text' && (
      <MessageItem
        variant={senderId !== id ? 'secondary' : 'primary'}
        left={senderId === id}
        content={content}
        theme={theme}
        msgId={msgId}
        chatId={chatId}
      />
    )) ||
      (type === 'gif' && (
        <GifPlayer
          left={senderId === id}
          theme={theme}
          src={content}
          msgId={msgId}
          chatId={chatId}
        />
      )) ||
      (type === 'file' &&
        ((content.fileType.includes('image') && (
          <ImageDisplayer
            swap={senderId === id}
            src={content.fileURL}
            theme={theme}
            msgId={msgId}
            chatId={chatId}
            fileInfo={content}
          />
        )) ||
          (content.fileType.includes('video') && (
            <VideoDisplayer
              swap={senderId === id}
              theme={theme}
              src={content.fileURL}
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
              chatId={chatId}
              msgId={msgId}
            />
          ))) ||
      undefined}
  </div>
)

export default Message
