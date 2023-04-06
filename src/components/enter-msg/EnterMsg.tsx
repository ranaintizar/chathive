import React from "react";
import dynamic from "next/dynamic";
import Picker from "react-giphy-component";
import { addDoc, collection } from "firebase/firestore";

import { db, storage } from "@/pages/api/firebase.js";
import GifPlayer from "components/gif-player";
import EmojiIcon from "assets/emoji.svg";
import GifIcon from "assets/gif.svg";
import StickerIcon from "assets/sticker.svg";
import AttachIcon from "assets/attach.svg";
import Spinner from "components/spinner";

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
  const [isLoading, setIsLoading] = React.useState(false);

  const collectionRef = collection(db, "files");

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

  const handleAttach = () => {
    const input = document.getElementById("fileInput");
    input?.click();
  };

  const handleFile = async (e: any) => {
    const files = e.target.files;

    const maxFiles = 3;
    if (files.length > maxFiles) {
      alert(`Please select up to ${maxFiles} files.`);
    } else if (files.length <= maxFiles) {
      for (let i = 0; i < files.length; i++) {
        setIsLoading(true);
        const file = files[i];
        const fileData = {
          fileName: file.name + "chathive",
          fileSize: file.size,
          fileType: file.type + "chathive",
          data: "base64" + "chathive",
        };

        console.log("Starting...");
        await addDoc(collectionRef, fileData)
          .then(() => console.log("Success!"))
          .catch((err) => console.log(err));
        console.log("Ending...");
      }
    }

    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner title="Uploading file..." color="dodgerblue" />
  ) : (
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
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={handleFile}
        />
        <button
          onClick={() => {
            setShowGifs(false);
            setShowEmojis(false);
            handleAttach();
          }}
        >
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
      <div></div>
    </div>
  );
};

export default EnterMsg;
