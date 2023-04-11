import React from "react";

import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";
import Icon from "assets/file.svg";

import stl from "./FIleThumbnail.module.scss";

interface Props {
  content: string;
  theme: string;
  handleOnClick: () => void;
}

const FileThumbnail = ({ handleOnClick, content, theme }: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.file}
    >
      <div className={stl.fileThumbnail} onClick={handleOnClick}>
        <Icon />
        <span className={stl.size}>{content}</span>
      </div>
      <MoreBtn
        visible={isVisible}
        theme={theme}
        handleOnClick={() => setShowDropdown(true)}
      />
      <Dropdown
        theme={theme}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        transformOrigin="top left"
        top="40%"
        left="90%"
        width={140}
        height={110}
        handleListItemClick={(item) => console.log(item)}
        list={["Option 1", "Option 2"]}
      />
    </div>
  );
};

export default FileThumbnail;
