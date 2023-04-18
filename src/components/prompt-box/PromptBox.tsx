import React, { useEffect } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";

import AlertBox from "components/alert-box";

import stl from "./PromptBox.module.scss";

interface Props {
  theme: string;
  name: string;
  visible: Boolean;
  maxWidth: number;
  handleOkClick: (arg: any) => void;
  handleCancelClick: () => void;
}

const PromptBox = ({
  theme,
  name,
  visible,
  maxWidth,
  handleOkClick,
  handleCancelClick,
}: Props) => {
  const [value, setValue] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    setValue("");
  }, [visible]);

  const nameSchema = Yup.string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required");

  const emailSchema = Yup.string()
    .trim()
    .required("Email is required")
    .email("Invalid email address");

  const handleErr = (err: string) => {
    console.log("Handling Errors");

    if (err) {
      setErrMsg(err + ".");
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : undefined}
      transition={visible ? { type: "spring" } : { type: "tween" }}
      style={{ maxWidth: maxWidth + "px" }}
      className={stl.promptBox}
    >
      <div className={stl.header}>
        {name === "displayName" ? "Change Your Name" : "Change Your Email"}
      </div>
      <div className={stl.body}>
        <input
          value={value}
          placeholder={
            name === "displayName" ? "Enter New Name" : "Enter New Email"
          }
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={stl.footer}>
        <button className={stl.cancelBtn} onClick={handleCancelClick}>
          Cancel
        </button>
        <button
          onClick={() => {
            name === "displayName"
              ? nameSchema
                  .validate(value)
                  .then(() => handleOkClick(value))
                  .catch((err) => handleErr(err.message))
              : emailSchema
                  .validate(value)
                  .then(() => handleOkClick(value))
                  .catch((err) => handleErr(err.message));
          }}
        >
          Ok
        </button>
      </div>
      <AlertBox
        theme={theme}
        visible={isVisible}
        msg={errMsg}
        title="Oops!"
        handleOnClick={() => setIsVisible(false)}
      />
    </motion.div>
  );
};

PromptBox.defaultProps = {
  name: "email",
  maxWidth: 400,
  visible: false,
  handleOkClick: (val: string) => console.log(val),
  handleCancelClick: () => console.log("Cancelled!"),
};

export default PromptBox;
