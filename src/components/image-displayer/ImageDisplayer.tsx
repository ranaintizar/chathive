import React from "react";
import Image from "next/image";

import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

import stl from "./ImageDisplayer.module.scss";

interface Props {
  swap: Boolean;
  theme: string;
  src: string;
}

const ImageDisplayer = ({ swap, theme, src }: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOptions = (itemName: string) => {
    if (itemName === "Delete") {
      console.log("Delete Photo");
    } else if (itemName === "Download") {
      console.log("Download Photo");
    }
  };

  return swap ? (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.imgDisplayer}
    >
      <MoreBtn
        visible={isVisible}
        theme={theme}
        handleOnClick={() => setShowDropdown(true)}
      />
      <Image src={src} width={350} height={400} alt="image" />
      <Dropdown
        theme={theme}
        list={["Delete", "Download"]}
        transformOrigin="top right"
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        width={130}
        height={100}
        top="48%"
        left="-30%"
        handleListItemClick={handleOptions}
      />
    </div>
  ) : (
    <div className={stl.imgDisplayer}>
      <Image src={src} width={350} height={400} alt="image" />
      <MoreBtn
        visible={isVisible}
        theme={theme}
        handleOnClick={() => setShowDropdown(true)}
      />
      <Dropdown
        theme={theme}
        list={["Delete", "Download"]}
        transformOrigin="top left"
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        width={130}
        height={100}
        handleListItemClick={handleOptions}
        top="49%"
        left="96%"
      />
    </div>
  );
};

ImageDisplayer.defaultProps = {
  swap: true,
};

export default ImageDisplayer;
