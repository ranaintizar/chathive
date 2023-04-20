import React from "react";
import clsx from "clsx";

import Header from "components/header";
import ProfileIcon from "assets/profile.svg";
import SettingsIcon from "assets/settings.svg";
import AppearanceIcon from "assets/appearance.svg";
import AboutIcon from "assets/about.svg";

import stl from "./SettingSidebar.module.scss";

interface Props {
  theme: string;
  handleOnClick: (arg: string) => void;
}

const SettingSidebar = ({ theme, handleOnClick }: Props) => {
  const [isSelected, setIsSelected] = React.useState("");

  return (
    <div className={stl.sidebar}>
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
            handleOnClick("appearance");
            setIsSelected("appearance");
          }}
          className={clsx(
            stl.option,
            isSelected === "appearance" && stl.active
          )}
        >
          <span className={stl.icon}>
            <AppearanceIcon />
          </span>
          Appearance
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
