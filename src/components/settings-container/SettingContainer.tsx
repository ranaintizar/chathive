import React from "react";

import Header from "components/header";
import ProfileSettings from "components/profile-settings";

import stl from "./SettingContainer.module.scss";

const SettingContainer = ({ theme, setIsVerified }: any) => {
  return (
    <div className={stl.stngContainer}>
      <Header theme={theme} titleCenter={true} dropdown={false} />
      <div className={stl.settingWrapper}>
        <div className={stl.setting}>
          <ProfileSettings theme={theme} setIsVerified={setIsVerified} />
        </div>
      </div>
    </div>
  );
};

export default SettingContainer;
