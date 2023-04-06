import React from "react";
import dynamic from "next/dynamic";
import Picker from "react-giphy-component";

import GifPlayer from "components/gif-player";
import EmojiIcon from "assets/emoji.svg";
import GifIcon from "assets/gif.svg";
import StickerIcon from "assets/sticker.svg";
import AttachIcon from "assets/attach.svg";

import stl from "./EnterMsg.module.scss";

const DynamicPicker = dynamic(
  () => import("emoji-picker-react").then((module) => module.default),
  { ssr: false }
);

const EnterMsg = () => {
  const [message, setMessage] = React.useState("");
  const [showEmojis, setShowEmojis] = React.useState(false);
  const [showGifs, setShowGifs] = React.useState(false);
  const [element, setElement] = React.useState(null);

  const handleSubmit = () => {
    console.log(message);
    setMessage("");
  };

  React.useEffect(() => {
    setTimeout(() => setElement(null), 3000);
  }, [element]);

  const handleGifSubmit = (src: string) => {
    // @ts-ignore
    setElement(<GifPlayer src={src} />);
  };

  const handleKey = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === true) {
      console.log("next line");
    } else if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={stl.enterMsg}>
      <textarea
        rows={1}
        onFocus={() => setShowEmojis(false)}
        value={message}
        placeholder="Press Shift + Enter for next line and Enter to send."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleKey}
      />
      <div className={stl.btnContainer}>
        <button
          onClick={() => {
            setShowGifs(false);
            setShowEmojis(!showEmojis);
          }}
        >
          <EmojiIcon />
        </button>
        <button
          onClick={() => {
            setShowEmojis(false);
            setShowGifs(!showGifs);
          }}
        >
          <GifIcon />
        </button>
        <button onClick={() => console.log("Sticker")}>
          <StickerIcon />
        </button>
        <button onClick={() => console.log("Attach")}>
          <AttachIcon />
        </button>
      </div>
      {showEmojis && (
        <div className={stl.emojiPicker}>
          <DynamicPicker
            width={320}
            height={400}
            onEmojiClick={(e) => setMessage((message) => message + e.emoji)}
            autoFocusSearch={false}
          />
        </div>
      )}
      {showGifs && (
        <div className={stl.emojiPicker}>
          <Picker
            onSelected={(e: any) => {
              console.log(e.downsized_small.mp4);
              handleGifSubmit(e.downsized_small.mp4);
            }}
            apiKey={process.env.APIKEY}
          />
        </div>
      )}
    </div>
  );
};

export default EnterMsg;
