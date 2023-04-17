import React from "react";

import stl from "./SettingContainer.module.scss";
import Header from "components/header";

const SettingContainer = ({ theme }: any) => {
  return (
    <div className={stl.stngContainer}>
      <Header theme={theme} titleCenter={true} dropdown={false} />
      <div className={stl.settingWrapper}>
        <div className={stl.setting}></div>
      </div>
    </div>
  );
};

export default SettingContainer;
