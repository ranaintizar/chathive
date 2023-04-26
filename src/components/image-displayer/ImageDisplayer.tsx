import React, { useEffect } from "react";
import Image from "next/image";

import {
  deleteFile,
  downloadFile,
  handleDelMsg,
} from "src/lib/firebaseFunctions";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

import stl from "./ImageDisplayer.module.scss";

interface Props {
  swap: Boolean;
  theme: string;
  src: string;
  msgId: string;
  chatId: string;
  fileInfo: any;
}

const ImageDisplayer = ({
  swap,
  theme,
  src,
  msgId,
  chatId,
  fileInfo,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [uid, setUID] = React.useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUID(user.uid);
  }, []);

  const handleOptions = (itemName: string) => {
    if (itemName === "Delete") {
      deleteFile(fileInfo.fileName);
      handleDelMsg(chatId, msgId);
    } else if (itemName === "Download") {
      downloadFile(fileInfo);
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
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.imgDisplayer}
    >
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
  src: "",
};

export default ImageDisplayer;
