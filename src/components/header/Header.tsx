import React from "react";
import clsx from "clsx";

import stl from "./Header.module.scss";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

interface Props {
  shadow: Boolean;
  theme: string;
  title: string;
  list: Array<string>;
  handleListItemClick: (arg: string) => void;
}

const Header = ({ shadow, theme, title, list, handleListItemClick }: Props) => {
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
          : undefined
      )}
    >
      <div className={stl.right}>{title}</div>
      <div className={stl.left}>
        <MoreBtn
          handleOnClick={() => setShowDropdown(true)}
          customClass={stl.moreBtn}
          theme={theme}
        />
        <Dropdown
          right="10%"
          theme={theme}
          list={list}
          handleListItemClick={(item) => {
            handleListItemClick(item);
            setShowDropdown(false);
          }}
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
  handleListItemClick: (item: string) => console.log(item),
};

export default Header;
