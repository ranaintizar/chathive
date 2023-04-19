import React from "react";

import Header from "components/header";
import ProfileSettings from "components/profile-settings";
import AccSettings from "components/acc-settings";

import stl from "./SettingContainer.module.scss";

interface Props {
  theme: string;
  setIsVerified: (arg: Boolean) => void;
}

const SettingContainer = ({ theme, setIsVerified }: Props) => {
  return (
    <div className={stl.stngContainer}>
      <Header theme={theme} titleCenter={true} dropdown={false} />
      <div className={stl.settingWrapper}>
        <div className={stl.setting}>
          {/* <ProfileSettings theme={theme} setIsVerified={setIsVerified} /> */}
          <AccSettings theme={theme} setIsVerified={setIsVerified} />
        </div>
      </div>
    </div>
  );
};

export default SettingContainer;
