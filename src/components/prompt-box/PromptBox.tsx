import React, { useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import * as Yup from "yup";

import AlertBox from "components/alert-box";

import stl from "./PromptBox.module.scss";

interface Props {
  theme: string;
  name: string;
  visible: Boolean;
  maxWidth: number;
  customClass?: string;
  handleOkClick: (arg: any) => void;
  handleCancelClick: () => void;
}

const PromptBox = ({
  theme,
  name,
  visible,
  maxWidth,
  customClass,
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

  const passwordSchema = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    );

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
      className={clsx(stl.promptBox, customClass)}
    >
      <div className={stl.header}>
        {(name === "displayName" && "Change Your Name") ||
          (name === "email" && "Change Your Email") ||
          (name === "password" && "Change Your Password")}
      </div>
      <div className={stl.body}>
        <input
          value={value}
          //@ts-ignore
          placeholder={
            (name === "displayName" && "Enter New Name") ||
            (name === "email" && "Enter New Email") ||
            (name === "password" && "Enter New Password")
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
            (name === "displayName" &&
              nameSchema
                .validate(value)
                .then(() => handleOkClick(value))
                .catch((err) => handleErr(err.message))) ||
              (name === "email" &&
                emailSchema
                  .validate(value)
                  .then(() => handleOkClick(value))
                  .catch((err) => handleErr(err.message))) ||
              (name === "password" &&
                passwordSchema
                  .validate(value)
                  .then(() => handleOkClick(value))
                  .catch((err) => handleErr(err.message)));
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
