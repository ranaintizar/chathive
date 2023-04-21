import React from "react";

import MoreBtn from "components/more-btn/MoreBtn";

import stl from "./GifPlayer.module.scss";
import Dropdown from "components/dropdown";
interface Props {
  src: string;
  width: number;
  height: number;
  theme: string;
  left: Boolean;
}

const GifPlayer = ({ src, width, height, theme, left }: Props) => {
  const [playCount, setPlayCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleLoop = () => {
    setPlayCount(playCount + 1);
    videoRef.current?.play();
  };

  const MoreOpt = () => {
    return (
      <MoreBtn
        visible={isVisible}
        theme={theme}
        handleOnClick={() => setShowDropdown(true)}
      />
    );
  };

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={stl.gifPlayer}
    >
      {left ? (
        <>
          <MoreOpt />
          <Dropdown
            theme={theme}
            transformOrigin="top right"
            top="48%"
            left="-48%"
            list={["Option 1", "Option 2"]}
            handleListItemClick={(item) => console.log("List Item: ", item)}
            width={150}
            height={110}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
          <video
            ref={videoRef}
            autoPlay
            onEnded={() => {
              playCount < 2 && handleLoop();
            }}
            onClick={() => {
              setPlayCount(0);
              videoRef.current?.play();
              console.log("CLied");
            }}
            style={{
              width: width + "px",
              height: height + "px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            onEnded={() => {
              playCount < 2 && handleLoop();
            }}
            onClick={() => {
              setPlayCount(0);
              videoRef.current?.play();
              console.log("CLied");
            }}
            style={{
              width: width + "px",
              height: height + "px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Dropdown
            theme={theme}
            transformOrigin="top left"
            top="48%"
            left="95%"
            list={["Option 1", "Option 2"]}
            handleListItemClick={(item) => console.log("List Item: ", item)}
            width={150}
            height={110}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
          <MoreOpt />
        </>
      )}
    </div>
  );
};

GifPlayer.defaultProps = {
  width: 250,
  height: 220,
};
export default GifPlayer;
