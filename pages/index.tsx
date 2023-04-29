import React, { useEffect } from "react";
import Head from "next/head";

import { auth } from "./api/firebase";
import SignupFlow from "components/signup-flow";
import ChatItem from "components/chat-item/ChatItem";
import MessageItem from "components/message-item";
import EnterMsg from "components/enter-msg";
import Spinner from "components/spinner";
import StartChatBtn from "components/start-chat-button";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";
import Header from "components/header";
import Sidebar from "components/sidebar";
import MessagesScreen from "components/messages-screen";
import VerifyMsg from "components/verify-msg";
import SettingScreen from "components/settings-screen";
import Data from "components/data-example";

export default function Home() {
  const [theme, setTheme] = React.useState("light");
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(false);
  const [id, setId] = React.useState("vXbaYZnp0NSCooY3t9l5");
  const [isVerified, setIsVerified] = React.useState(false);

  // const save = () => {
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({ uid: id, displayName: "Rana Aftab" })
  //   );
  // };

  // save();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(true);
        if (authUser?.emailVerified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } else {
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (typeof window !== "undefined") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("Dark mode is enabled.");
    } else {
      console.log("Light mode is enabled.");
    }
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <>
      <Head>
        <title>ChatHive</title>
        <meta
          name="description"
          content="Stay connected with your customers or friends using our Simple Chat App. Engage in real-time conversations on any device, with features like file sharing, emojis, and more. Sign up now for a seamless chat experience!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <main
        style={
          theme === "dark"
            ? {
                height: "100vh",
                background: "#202124",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "none",
              }
        }
      >
        {isLoading ? (
          <Spinner spinnerColor="#fff" />
        ) : user ? (
          isVerified ? (
            // <SettingScreen
            //   toggleTheme={toggleTheme}
            //   theme={theme}
            //   setIsVerified={setIsVerified}
            // />
            // <MessagesScreen theme={theme} toggleTheme={toggleTheme} myId={id} />
            <SettingScreen theme={theme} toggleTheme={toggleTheme} />
          ) : (
            // <Data />
            <VerifyMsg email={auth.currentUser?.email} />
          )
        ) : (
          <SignupFlow
            toggleTheme={toggleTheme}
            setIsVerified={setIsVerified}
            theme={theme}
          />
          // <MessagesScreen theme={theme} toggleTheme={toggleTheme} myId={id} />
          // <Data />
        )}
      </main>
    </>
  );
}
