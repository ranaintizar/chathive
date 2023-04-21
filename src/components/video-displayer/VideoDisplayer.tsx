import React from "react";

import PlayIcon from "assets/play.svg";
import PauseIcon from "assets/pause.svg";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

import stl from "./VideoDisplayer.module.scss";

const VideoDisplayer = ({ theme, swap, src, type }: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [content, setContent] = React.useState(<PlayIcon />);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

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

  const handleEnded = () => {
    setContent(<PlayIcon />);
    setIsPlaying(false);
  };

  const handleOptions = (itemName: string) => {
    if (itemName === "Delete") {
      console.log("Delete Video");
    } else if (itemName === "Download") {
      console.log("Download Video");
    }
  };

  const handleHover = () => {
    setIsVisible(true);
    console.log("Hovering...");
  };
  const handleBlur = () => {
    setIsVisible(false);
    console.log("Not Hovering...");
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
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
            transformOrigin="top left"
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            top="50%"
            left="96%"
            width={120}
            height={100}
            handleListItemClick={handleOptions}
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
            top="50%"
            left="96%"
            width={120}
            height={100}
            handleListItemClick={handleOptions}
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
