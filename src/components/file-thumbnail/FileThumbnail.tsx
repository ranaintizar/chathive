import React from "react";

import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";
import Icon from "assets/file.svg";

import stl from "./FIleThumbnail.module.scss";

interface Props {
  theme: string;
  fileInfo: any;
  left: Boolean;
}

const FileThumbnail = ({ theme, fileInfo, left }: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const downloadFile = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var blob = xhr.response;
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = fileInfo.fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else if (xhr.status === 404) {
          console.log("File Not Found");
        } else if (xhr.status === 0) {
          console.log("Network Disconnected");
        }
      }
    };
    xhr.open("GET", fileInfo.fileUrl);
    xhr.send();
  };

  const formatBytes = () => {
    const KB = 1024;
    const MB = 1024 * 1024;

    if (fileInfo.fileSize < KB) {
      return fileInfo.fileSize + " bytes";
    } else if (fileInfo.fileSize < MB) {
      return (fileInfo.fileSize / KB).toFixed(2) + " KB";
    } else {
      return (fileInfo.fileSize / MB).toFixed(2) + " MB";
    }
  };

  const File = () => {
    return (
      <div className={stl.fileThumbnail} onClick={downloadFile}>
        <Icon />
        <span className={stl.size}>{formatBytes()}</span>
      </div>
    );
  };

  const MoreOpt = ({ handleOnClick }: any) => {
    return (
      <MoreBtn
        visible={isVisible}
        theme={theme}
        handleOnClick={handleOnClick}
      />
    );
  };

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.file}
    >
      {left ? (
        <>
          <MoreOpt handleOnClick={() => setShowDropdown(true)} />
          <Dropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            transformOrigin="top right"
            top="50%"
            left="-104%"
            theme={theme}
            width={140}
            height={110}
            handleListItemClick={(item) => console.log(item)}
            list={["Option 1", "Option 2"]}
          />
          <File />
        </>
      ) : (
        <>
          <File />
          <Dropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            transformOrigin="top left"
            top="40%"
            left="90%"
            theme={theme}
            width={140}
            height={110}
            handleListItemClick={(item) => console.log(item)}
            list={["Option 1", "Option 2"]}
          />
          <MoreOpt handleOnClick={() => setShowDropdown(true)} />
        </>
      )}
    </div>
  );
};

export default FileThumbnail;
