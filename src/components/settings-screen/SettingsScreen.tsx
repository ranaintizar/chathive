import React from "react";

import SettingSidebar from "components/settings-sidebar";
import SettingContainer from "components/settings-container";

import stl from "./SettingScreen.module.scss";

const SettingScreen = ({ theme, setIsVerified }: any) => {
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
