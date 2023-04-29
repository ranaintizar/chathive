import React, { useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/pages/api/firebase";
import { handleFile } from "src/lib/firebaseFunctions";
import { generateRandomString, formatDate } from "src/lib";

import stl from "./Data.module.scss";
import { ref } from "firebase/storage";

const Data = () => {
  const [chats, setChats] = React.useState([]);
  const uid = "vXbaYZnp0NSCooY3t9l5";
  const chatId = "Ml9feOXcPKrlBoKmb5Eb";
  const msgId = "WaImSwCIEarLFuOdg58r";

  const docRef = doc(db, "users", uid);
  const chatsRef = collection(docRef, "chats");

  useEffect(() => {
    onSnapshot(chatsRef, (snapshot) => {
      //@ts-ignore
      setChats(snapshot.docs);
    });
  }, []);

  const getMsgsWithChatId = async (uid: string, id: string) => {
    console.log("Getting Messages...");

    const userDoc = doc(db, "users", uid);
    const chatsRef = collection(userDoc, "chats");
    const chatsDoc = doc(chatsRef, id);
    const msgsRef = collection(chatsDoc, "messages");
    const querySnapshot = await getDocs(msgsRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const delMsgFromChat = async (uid: string, chatId: string, msgId: string) => {
    console.log("Deleting Message...");

    const userDoc = doc(db, "users", uid);
    const chatsRef = collection(userDoc, "chats");
    const chatsDoc = doc(chatsRef, chatId);
    const msgsRef = collection(chatsDoc, "messages");
    const msgDoc = doc(msgsRef, msgId);
    await deleteDoc(msgDoc)
      .then(() => console.log("Message Deleted Successfully!"))
      .catch((err) => console.log("Error while deleting Message:", err));
  };

  const addMsg = async (uid: string, chatId: string) => {
    console.log("Adding Message...");

    const messageType = prompt("Enter Message Type:");
    const messageContent = prompt("Enter Message Content:");
    const senderId = prompt("Enter Sender Id:");
    const time = new Date();
    const id = await generateRandomString(20);

    const userDoc = doc(db, "users", uid);
    const chatsRef = collection(userDoc, "chats");
    const chatsDoc = doc(chatsRef, chatId);
    const msgsRef = collection(chatsDoc, "messages");
    const docRef = doc(msgsRef, id);

    await setDoc(docRef, { messageType, messageContent, senderId, time })
      .then(() => {
        console.log("Document added successfully!");
      })
      .catch((err) => {
        console.error("Error while adding document:", err);
      });

    console.log({ messageType, messageContent, senderId, time });
  };

  return (
    <div className={stl.data}>
      <input
        type="file"
        // onChange={(e) => handleFile(e, (param) => console.log(param))}
      />
      <button onClick={() => getMsgsWithChatId(uid, chatId)}>
        Get Chat Messages
      </button>
      <button disabled onClick={() => delMsgFromChat(uid, chatId, msgId)}>
        Delete msg from Chat
      </button>
      <button onClick={() => addMsg(uid, chatId)}>Add Message</button>
      <button>{formatDate("22 Apr 2023 at 10:40:35 UTC+5")}</button>
      <div className={stl.chats}>
        <h2>Chats</h2>
        {chats.map((doc: any, i: number) => (
          <p key={i}>{doc.data().chatName}</p>
        ))}
      </div>
    </div>
  );
};

export default Data;
