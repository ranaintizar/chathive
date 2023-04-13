import React from "react";
import clsx from "clsx";

import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";
import BackIcon from "assets/back.svg";

import stl from "./Header.module.scss";

interface Props {
  shadow: Boolean;
  theme: string;
  title: string;
  list: Array<string>;
  backBtn: Boolean;
  customElement?: JSX.Element;
  customClass?: string;
  handleBackBtn: () => void;
}

const Header = ({
  shadow,
  theme,
  title,
  list,
  backBtn,
  customElement,
  customClass,
  handleBackBtn,
}: Props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div
      className={clsx(
        stl.header,
        theme === "dark" ? stl.darkHeader : undefined,
        shadow
          ? theme === "dark"
            ? stl.shadowDark
            : stl.shadowLight
          : undefined,
        customClass
      )}
    >
      <div className={stl.right}>
        {backBtn ? (
          <div onClick={handleBackBtn} className={stl.backBtn}>
            <BackIcon />
          </div>
        ) : undefined}
        {title}
      </div>
      <div className={stl.left}>
        <MoreBtn
          handleOnClick={() => setShowDropdown(true)}
          customClass={stl.moreBtn}
          theme={theme}
        />
        {customElement}
        <Dropdown
          transformOrigin="top right"
          right="40%"
          theme={theme}
          list={list}
          handleListItemClick={(item) => console.log(item)}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "Messages",
  list: ["Option 1", "Option 2", "Option 3", "Option 4"],
  backBtn: false,
  handleBackBtn: () => console.log("Back Btn Clicked..."),
};

export default Header;
