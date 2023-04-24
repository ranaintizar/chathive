import React from "react";

import SettingSidebar from "components/settings-sidebar";
import SettingContainer from "components/settings-container";

import stl from "./SettingScreen.module.scss";

interface Props {
  theme: string;
  setIsVerified: any;
  toggleTheme: any;
}

const SettingScreen = ({ theme, setIsVerified, toggleTheme }: Props) => {
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
      <SettingSidebar theme={theme} handleOnClick={handleSideBarItem} />
      <SettingContainer
        toggleTheme={toggleTheme}
        name={name}
        title={title}
        theme={theme}
        setIsVerified={setIsVerified}
      />
    </div>
  );
};

export default SettingScreen;
