import React, { useEffect } from "react";

import {
  deleteFile,
  downloadFile,
  handleDelMsg,
} from "src/lib/firebaseFunctions";
import PlayIcon from "assets/play.svg";
import PauseIcon from "assets/pause.svg";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

import stl from "./VideoDisplayer.module.scss";

interface Props {
  theme: string;
  swap: Boolean;
  src: string;
  type: string;
  chatId: string;
  msgId: string;
  fileInfo: any;
}

const VideoDisplayer = ({
  theme,
  swap,
  src,
  type,
  chatId,
  msgId,
  fileInfo,
}: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [content, setContent] = React.useState(<PlayIcon />);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideo = () => {
    const video = videoRef.current;
    if (isPlaying === false) {
      video?.play();
      setContent(<PauseIcon />);
    } else if (isPlaying) {
      video?.pause();
      setContent(<PlayIcon />);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleEnded = () => {
    setContent(<PlayIcon />);
    setIsPlaying(false);
  };

  const handleListItemClick = (item: string) => {
    if (item === "Delete") {
      deleteFile(fileInfo.fileName);
      handleDelMsg(chatId, msgId);
    } else if (item === "Download") {
      downloadFile(fileInfo);
    }
  };

  return isLoading ? (
    <div></div>
  ) : (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.videoPlayer}
    >
      {swap ? (
        <>
          <MoreBtn
            visible={isVisible}
            theme={theme}
            handleOnClick={() => setShowDropdown(true)}
          />
          <div className={stl.video}>
            <video ref={videoRef} onEnded={handleEnded}>
              <source src={src} type={type} />
            </video>
            <button className={stl.actionBtn} onClick={handleVideo}>
              {content}
            </button>
          </div>
          <Dropdown
            theme={theme}
            list={["Delete", "Download"]}
            transformOrigin="top right"
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            top="50%"
            left="-23%"
            width={120}
            height={100}
            handleListItemClick={handleListItemClick}
          />
        </>
      ) : (
        <>
          <div className={stl.video}>
            <video ref={videoRef} onEnded={handleEnded}>
              <source src={src} type={type} />
            </video>
            <button className={stl.actionBtn} onClick={handleVideo}>
              {content}
            </button>
          </div>
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
            top="49.5%"
            left="94%"
            width={120}
            height={100}
            handleListItemClick={handleListItemClick}
          />
        </>
      )}
    </div>
  );
};

VideoDisplayer.defaultProps = {
  swap: true,
};

export default VideoDisplayer;
