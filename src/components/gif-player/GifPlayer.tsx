import React from "react";

interface Props {
  src: string;
  width: number;
  height: number;
}

const GifPlayer = ({ src, width, height }: Props) => {
  const [playCount, setPlayCount] = React.useState(0);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleLoop = () => {
    setPlayCount(playCount + 1);
    videoRef.current?.play();
  };

  return (
    <video
      id="video"
      ref={videoRef}
      autoPlay
      onEnded={() => {
        playCount < 2 && handleLoop();
      }}
      onClick={() => {
        setPlayCount(0);
        videoRef.current?.play();
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
  );
};

GifPlayer.defaultProps = {
  width: 250,
  height: 220,
};
export default GifPlayer;
