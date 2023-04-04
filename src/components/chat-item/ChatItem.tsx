import React from "react";
import Image from "next/image";

import ProfileImage from "assets/profileImage.jpeg";

import stl from "./Chat.module.scss";

interface Props {
  id: string;
  data: any;
  badge: number;
  handleOnClick: (arg: any) => void;
}

const ChatItem = ({ id, handleOnClick, data, badge }: Props) => {
  return (
    <div onClick={() => handleOnClick(data)} id={id} className={stl.chatItem}>
      <div className={stl.container}>
        <div className={stl.avatar}>
          <Image
            src={ProfileImage.src}
            width={50}
            height={50}
            alt="profile-img"
          />
        </div>
        <div className={stl.left}>
          <div className={stl.info}>
            <span className={stl.title}>{data.displayName}</span>
            <span className={stl.message}>{data.message}</span>
          </div>
          <div className={stl.right}>
            <div className={stl.time}>{data.timeAgo}</div>
            {badge && <div className={stl.badge}>{badge}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

ChatItem.defaultProps = {
  id: "this is id",
  data: {
    displayName: "Your Name",
    message: "This is Last Message from this",
    timeAgo: "25m",
  },
  handleOnClick: (data: any) => console.log(data),
  badge: 7,
};

export default ChatItem;
