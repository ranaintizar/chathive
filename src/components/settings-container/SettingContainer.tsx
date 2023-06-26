import React from "react";
import clsx from "clsx";

import Header from "components/header";
import ProfileSettings from "components/profile-settings";
import AccSettings from "components/acc-settings";
import Feedback from "components/feedback";
import About from "components/about";

import stl from "./SettingContainer.module.scss";

interface Props {
  theme: string;
  name: string;
  title: string;
  toggleTheme?: () => void;
}

const SettingContainer = ({ theme, title, name, toggleTheme }: Props) => (
  <div className={stl.stngContainer}>
    <Header
      themeBtn={true}
      toggleTheme={toggleTheme}
      theme={theme}
      title={title}
      titleCenter={true}
      dropdown={false}
    />
    <div
      className={clsx(
        stl.settingWrapper,
        theme === "dark" ? stl.darkSettingWrapper : undefined
      )}
    >
      <div className={stl.setting}>
        {(name === "profile" && <ProfileSettings theme={theme} />) ||
          (name === "account" && <AccSettings theme={theme} />) ||
          (name === "feedback" && <Feedback theme={theme} />) ||
          (name === "about" && <About theme={theme} />)}
      </div>
    </div>
  </div>
);

export default SettingContainer;
