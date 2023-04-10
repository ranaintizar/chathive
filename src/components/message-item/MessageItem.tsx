import React from "react";

import MoreBtn from "components/more-btn/MoreBtn";

import stl from "./MessageItem.module.scss";
import Dropdown from "components/dropdown";

interface Props {
  variant: string;
  content: string;
  theme: string;
  list: Array<string>;
  handleListItemClick: (arg: string) => void;
}

const MessageItem = ({
  theme,
  variant,
  content,
  list,
  handleListItemClick,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleHover = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.opacity = "1";
  };

  const handleBlur = () => {
    const moreBtn = document.getElementById("more-btn");
    //@ts-ignore
    moreBtn.style.opacity = "0";
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      className={stl.container}
    >
      <div
        style={
          variant === "primary"
            ? { background: "#1e90ff" }
            : theme === "dark"
            ? { background: " #303030" }
            : { background: "#f1f1f1" }
        }
        className={stl.msgItem}
      >
        <span
          style={
            variant === "primary"
              ? { color: "#fff" }
              : theme === "dark"
              ? { color: "#fff" }
              : { color: "#000" }
          }
          className={stl.message}
        >
          {content}
        </span>
      </div>
      <MoreBtn theme={theme} handleOnClick={() => setShowDropdown(true)} />
      <Dropdown
        top="50%"
        right="1%"
        theme={theme}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        list={list}
        width={130}
        height={110}
        handleListItemClick={(item) => {
          setShowDropdown(false);
          handleListItemClick(item);
        }}
      />
    </div>
  );
};

MessageItem.defaultProps = {
  variant: "primary",
  list: ["Option 1", "Option 2"],
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id libero non velit ultricies sodales. Donec eget ultricies sapien. Aliquam erat volutpat. Donec ut est nibh. Fusce dapibus ante non libero cursus auctor. Etiam dictum ipsum a enim viverra sollicitudin. Sed eu diam ex. Aliquam quis velit ut elit vestibulum ultricies vel quis elit. Sed aliquam risus eget ligula fringilla, eu rutrum velit bibendum. Nam volutpat ante vitae nulla bibendum, ac tincidunt nibh lobortis.",
  handleListItemClick: (item: string) => console.log(item),
};

export default MessageItem;
