import React from "react";
import clsx from "clsx";

import stl from "./Header.module.scss";
import MoreBtn from "components/more-btn/MoreBtn";
import Dropdown from "components/dropdown";

const Header = ({ shadow, theme, title, list, handleListItemClick }: any) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div
      className={clsx(
        stl.header,
        theme === "dark" ? stl.darkHeader : undefined,
        shadow && theme === "dark" ? stl.shadowDark : stl.shadowLight
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
  shadow: true,
  handleListItemClick: (item: string) => console.log(item),
};

export default Header;
