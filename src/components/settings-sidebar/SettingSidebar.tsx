import React from "react";
import clsx from "clsx";

import Header from "components/header";
import ProfileIcon from "assets/profile.svg";
import SettingsIcon from "assets/settings.svg";
import FeedbackIcon from "assets/feedback.svg";
import AboutIcon from "assets/about.svg";

import stl from "./SettingSidebar.module.scss";

interface Props {
  theme: string;
  handleOnClick: (arg: string) => void;
}

const SettingSidebar = ({ theme, handleOnClick }: Props) => {
  const [isSelected, setIsSelected] = React.useState("profile");

  return (
    <div
      className={clsx(
        stl.sidebar,
        theme === "dark" ? stl.darkSidebar : undefined
      )}
    >
      <Header
        title="Settings"
        titleCenter={true}
        theme={theme}
        backBtn={true}
        dropdown={false}
      />
      <div className={stl.options}>
        <span
          id="profile"
          onClick={() => {
            handleOnClick("profile");
            setIsSelected("profile");
          }}
          className={clsx(stl.option, isSelected === "profile" && stl.active)}
        >
          <span className={stl.icon}>
            <ProfileIcon />
          </span>
          Profile
        </span>
        <span
          id="account"
          onClick={() => {
            handleOnClick("account");
            setIsSelected("account");
          }}
          className={clsx(stl.option, isSelected === "account" && stl.active)}
        >
          <span className={stl.icon}>
            <SettingsIcon />
          </span>
          Account
        </span>
        <span
          id="appearance"
          onClick={() => {
            handleOnClick("feedback");
            setIsSelected("feedback");
          }}
          className={clsx(stl.option, isSelected === "feedback" && stl.active)}
        >
          <span className={stl.icon}>
            <FeedbackIcon />
          </span>
          Feedback
        </span>
        <span
          id="about"
          onClick={() => {
            handleOnClick("about");
            setIsSelected("about");
          }}
          className={clsx(stl.option, isSelected === "about" && stl.active)}
        >
          <span className={stl.icon}>
            <AboutIcon />
          </span>
          About
        </span>
      </div>
    </div>
  );
};

export default SettingSidebar;
