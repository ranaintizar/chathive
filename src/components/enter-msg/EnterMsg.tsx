import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Picker from "react-giphy-component";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { db, storage } from "@/pages/api/firebase.js";
import Spinner from "components/spinner";
import GifPlayer from "components/gif-player";
import EmojiIcon from "assets/emoji.svg";
import GifIcon from "assets/gif.svg";
import StickerIcon from "assets/sticker.svg";
import AttachIcon from "assets/attach.svg";
import SendIcon from "assets/send.svg";

import stl from "./EnterMsg.module.scss";

const DynamicPicker = dynamic(
  () => import("emoji-picker-react").then((module) => module.default),
  { ssr: false }
);

interface Props {
  theme: string;
}

const EnterMsg = ({ theme }: Props) => {
  const [message, setMessage] = React.useState("");
  const [showEmojis, setShowEmojis] = React.useState(false);
  const [showGifs, setShowGifs] = React.useState(false);
  const [element, setElement] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState({
    fileName: "File Name",
    fileSize: 128,
    fileType: "File Type",
    fileUrl: "https://url.com",
  });
  const collectionRef = collection(db, "files");

  const handleSubmit = () => {
    console.log(message);
    if (message === "") {
      alert("Can't send Empty Message");
    }
    setMessage("");
  };

  useEffect(() => {
    setTimeout(() => setElement(null), 3000);
  }, [element]);

  const handleGifSubmit = (src: string) => {
    // @ts-ignore
    setElement(<GifPlayer src={src} />);
  };

  const handleKey = (e: any) => {
    setTimeout(() => {
      const height = e.target.offsetHeight;
      const scrollHeight = e.target.scrollHeight;

      if (height <= 120) {
        e.target.style.paddingTop = "5px";
        e.target.style.height = scrollHeight - 15 + "px";
      }

      if (e.keyCode === 8) {
        const isEmpty = e.target.value === "";
        if (isEmpty) {
          e.target.paddingTop = "12px";
          e.target.style.height = "30px";
        }
      } else if (e.keyCode === 13 && e.shiftKey === true) {
        if (height <= 120) {
          e.target.style.paddingTop = "5px";
          e.target.style.height = height + 5 + "px";
        }
      } else if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    }, 50);
  };

  const handleAttach = () => {
    const input = document.getElementById("fileInput");
    input?.click();
  };

  const downloadFile = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var blob = xhr.response;
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = file.fileName;
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
    xhr.open(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/airy-shadow-364605.appspot.com/o/files%2FA13-01-NewMediaControls_3.mp4?alt=media&token=4c3a5b5a-14e8-4710-b4be-ce9c8ed36a1d"
    );
    xhr.send();
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

        const storageRef = ref(
          storage,
          `${process.env.BUCKET}/files/${file.name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error(error);
          },
          () => {
            console.log("Upload successful");

            getDownloadURL(storageRef).then(async (url) => {
              console.log("Url is: ", url);
              const fileMeta = (await uploadTask).metadata;

              const fileInfo = {
                fileName: fileMeta.name,
                fileSize: fileMeta.size,
                fileType: fileMeta.contentType,
                fileUrl: url,
              };
              //@ts-ignore
              setFile(fileInfo);

              await addDoc(collectionRef, fileInfo)
                .then((docRef) =>
                  console.log("Stored info in Firestore document : ", docRef.id)
                )
                .catch((err) => console.log(err));
            });
          }
        );
      }
    }

    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner title="Uploading file..." color="dodgerblue" />
  ) : (
    <div className={stl.container}>
      <div
        className={clsx(
          stl.enterMsg,
          theme === "dark" ? stl.darkEnterMsg : undefined
        )}
      >
        <textarea
          rows={1}
          onFocus={() => {
            setShowEmojis(false);
            setShowGifs(false);
          }}
          value={message}
          className={theme === "dark" ? stl.darkTextArea : undefined}
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
            <EmojiIcon
              className={theme === "dark" ? stl.emoteDark : undefined}
            />
          </button>
          <button
            onClick={() => {
              setShowEmojis(false);
              setShowGifs(!showGifs);
            }}
          >
            <GifIcon className={theme === "dark" ? stl.dark : undefined} />
          </button>
          <button onClick={() => downloadFile()}>
            <StickerIcon className={theme === "dark" ? stl.dark : undefined} />
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
            <AttachIcon className={theme === "dark" ? stl.dark : undefined} />
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
      <button className={stl.submitBtn} onClick={handleSubmit}>
        <SendIcon />
      </button>
    </div>
  );
};

export default EnterMsg;
