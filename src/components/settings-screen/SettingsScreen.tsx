import React from "react";

import SettingSidebar from "components/settings-sidebar";
import SettingContainer from "components/settings-container";

import stl from "./SettingScreen.module.scss";

interface Props {
  theme: string;
  setIsVerified: (arg: Boolean) => void;
}

const SettingScreen = ({ theme, setIsVerified }: Props) => {
  return (
    <div className={stl.stngScrn}>
      {/* <SettingSidebar
        theme={theme}
        handleOnClick={(name: string) => console.log(name)}
      /> */}
      <SettingContainer theme={theme} setIsVerified={setIsVerified} />
    </div>
  );
};

export default SettingScreen;
