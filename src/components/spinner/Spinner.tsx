import React from "react";

import stl from "./Spinner.module.scss";

interface Props {
  color: string;
  borderWidth: number;
  width: number;
  height: number;
  title?: string;
}

const Spinner = ({ title, color, borderWidth, width, height }: Props) => {
  return (
    <div className={stl.loading}>
      <div style={{ width, height }} className={stl.spinner}>
        <div
          style={{
            borderColor: `${color} transparent transparent transparent`,
            borderWidth: borderWidth + "px",
            width: (80 / 100) * width + "px",
            height: (80 / 100) * height + "px",
          }}
        />
        <div
          style={{
            borderColor: `${color} transparent transparent transparent`,
            borderWidth: borderWidth + "px",
            width: (80 / 100) * width + "px",
            height: (80 / 100) * height + "px",
          }}
        />
        <div
          style={{
            borderColor: `${color} transparent transparent transparent`,
            borderWidth: borderWidth + "px",
            width: (80 / 100) * width + "px",
            height: (80 / 100) * height + "px",
          }}
        />
        <div
          style={{
            borderColor: `${color} transparent transparent transparent`,
            borderWidth: borderWidth + "px",
            width: (80 / 100) * width + "px",
            height: (80 / 100) * height + "px",
          }}
        />
      </div>
      {title && <span className={stl.title}>{title}</span>}
    </div>
  );
};

Spinner.defaultProps = {
  color: "#fff",
  borderWidth: 8,
  width: 100,
  height: 100,
};

export default Spinner;
