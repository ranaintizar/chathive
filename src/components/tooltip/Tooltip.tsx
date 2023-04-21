import React from "react";
import clsx from "clsx";

import stl from "./Tooltip.module.scss";

interface Props {
  content?: string;
  theme: string;
  top?: number;
  right?: string;
  bottom?: string;
  left?: number;
  visible: Boolean;
}

const Tooltip = ({
  content,
  theme,
  top,
  right,
  bottom,
  left,
  visible,
}: Props) => {
  return (
    <div
      style={{
        top: top + "px",
        right,
        bottom,
        left: left + "px",
      }}
      className={clsx(
        stl.tooltip,
        theme === "dark" ? stl.darkTooltip : undefined,
        visible ? stl.showTooltip : undefined
      )}
    >
      {content}
    </div>
  );
};

Tooltip.defaultProps = {
  content: "This is a toolitp.",
  visible: false,
};

export default Tooltip;
