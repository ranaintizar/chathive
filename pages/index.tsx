import React from "react";
import Head from "next/head";

import SignupFlow from "components/signup-flow";
import ChatItem from "components/chat-item/ChatItem";
import MessageItem from "components/message-item";
import EnterMsg from "components/enter-msg";
import Spinner from "components/spinner";
import StartChatBtn from "components/start-chat-button";

export default function Home() {
  const [theme, setTheme] = React.useState("light");

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
                background: "#17171c",
                position: "relative",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }
            : {
                height: "100vh",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                background: "#ccc",
              }
        }
      >
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          Toggle Theme
        </button>
        <SignupFlow theme={theme} />
      </main>
    </>
  );
}
