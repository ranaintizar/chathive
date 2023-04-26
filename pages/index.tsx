import React, { useEffect } from "react";
import Head from "next/head";

import { auth } from "./api/firebase";
import SignupFlow from "components/signup-flow";
import Spinner from "components/spinner";
import MessagesScreen from "components/messages-screen";
import VerifyMsg from "components/verify-msg";
import SettingScreen from "components/settings-screen";

export default function Home() {
  const [theme, setTheme] = React.useState("light");
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(false);
  const [id, setId] = React.useState("null");
  const [isVerified, setIsVerified] = React.useState(false);
  const [showMsgs, setShowMsgs] = React.useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(true);
        setId(authUser.uid);
        if (authUser?.emailVerified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } else {
        setShowMsgs(true);
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
      <main>
        {isLoading ? (
          <Spinner spinnerColor="#fff" />
        ) : user ? (
          isVerified ? (
            showMsgs ? (
              <MessagesScreen
                theme={theme}
                toggleTheme={toggleTheme}
                myId={id}
                setShowMsgs={setShowMsgs}
              />
            ) : (
              <SettingScreen
                theme={theme}
                toggleTheme={toggleTheme}
                setShowMsgs={setShowMsgs}
              />
            )
          ) : (
            <VerifyMsg email={auth.currentUser?.email} />
          )
        ) : (
          <SignupFlow toggleTheme={toggleTheme} theme={theme} />
        )}
      </main>
    </>
  );
}
