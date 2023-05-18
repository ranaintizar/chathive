import React from "react";

import { makeToastEmpty } from "src/lib/firebaseFunctions";
import SettingSidebar from "components/settings-sidebar";
import SettingContainer from "components/settings-container";
import Toast from "components/toast";

import stl from "./SettingScreen.module.scss";

interface Props {
  theme: string;
  toggleTheme: any;
  setShowMsgs: any;
  toastMsg: any;
}

const SettingScreen = ({
  theme,
  toggleTheme,
  setShowMsgs,
  toastMsg,
}: Props) => {
  const [title, setTitle] = React.useState("Profile");
  const [name, setName] = React.useState("profile");

  const handleSideBarItem = (item: string) => {
    if (item === "profile") {
      setTitle("Profile");
      setName("profile");
    } else if (item === "account") {
      setTitle("Account");
      setName("account");
    } else if (item === "feedback") {
      setTitle("Feedback");
      setName("feedback");
    } else if (item === "about") {
      setTitle("About");
      setName("about");
    }
  };

  return (
    <div className={stl.stngScrn}>
      <SettingSidebar
        theme={theme}
        handleOnClick={handleSideBarItem}
        setShowMsgs={setShowMsgs}
      />
      <SettingContainer
        toggleTheme={toggleTheme}
        name={name}
        title={title}
        theme={theme}
      />
      <Toast
        theme={theme}
        variant={toastMsg?.variant}
        text={toastMsg?.text}
        isVisible={toastMsg?.text !== ""}
        handleClose={makeToastEmpty}
      />
    </div>
  );
};

export default SettingScreen;
