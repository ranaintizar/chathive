import React from "react";

import stl from "./MessageItem.module.scss";

interface Props {
  variant: string;
  content: string;
}

const MessageItem = ({ variant, content }: Props) => {
  return (
    <div
      style={
        variant === "primary"
          ? { background: "#1e90ff" }
          : { background: "#f1f1f1" }
      }
      className={stl.msgItem}
    >
      <span
        style={variant === "primary" ? { color: "#fff" } : { color: "#000" }}
        className={stl.message}
      >
        {content}
      </span>
    </div>
  );
};

MessageItem.defaultProps = {
  variant: "primary",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id libero non velit ultricies sodales. Donec eget ultricies sapien. Aliquam erat volutpat. Donec ut est nibh. Fusce dapibus ante non libero cursus auctor. Etiam dictum ipsum a enim viverra sollicitudin. Sed eu diam ex. Aliquam quis velit ut elit vestibulum ultricies vel quis elit. Sed aliquam risus eget ligula fringilla, eu rutrum velit bibendum. Nam volutpat ante vitae nulla bibendum, ac tincidunt nibh lobortis.",
};

export default MessageItem;
