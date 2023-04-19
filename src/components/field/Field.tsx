import React from "react";
import clsx from "clsx";

import {
  updateName,
  handleUpdateEmail,
  handleUpdatePass,
} from "src/lib/firebaseFunctions";
import PromptBox from "components/prompt-box";

import stl from "./Field.module.scss";

interface Props {
  theme: string;
  name: string;
  title: string;
  content: string;
  btnLabel: string;
  className?: string;
  setUser?: (arg: any) => void;
  setIsVerified: (arg: Boolean) => void;
}

const Field = ({
  name,
  theme,
  title,
  content,
  btnLabel,
  className,
  setUser,
  setIsVerified,
}: Props) => {
  const [isPromptVisible, setIsPropmtVisible] = React.useState(false);

  const update = (val: string) => {
    console.log("Updating...");
    if (name === "displayName") {
      //@ts-ignore
      updateName(val, setUser);
    } else if (name === "email") {
      //@ts-ignore
      handleUpdateEmail(val, setIsVerified, setUser);
    } else if (name === "password") {
      handleUpdatePass(val);
    }
    setIsPropmtVisible(false);
  };

  return (
    <div
      className={clsx(stl.field, theme === "dark" ? stl.darkField : undefined)}
    >
      <span className={stl.label}>{title}</span>
      <span className={stl.title}>{content}</span>
      <div className={stl.btnContainer}>
        <button
          className={className && stl[className]}
          onClick={() => setIsPropmtVisible(true)}
        >
          {btnLabel}
        </button>
      </div>
      <PromptBox
        customClass={stl.prompt}
        theme={theme}
        name={name}
        visible={isPromptVisible}
        handleCancelClick={() => setIsPropmtVisible(false)}
        handleOkClick={update}
      />
    </div>
  );
};

Field.defaultProps = {
  title: "Logout",
  content: "Logout your Account?",
  btnLabel: "Logout",
};

export default Field;
