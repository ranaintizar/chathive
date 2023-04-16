import React from "react";
import { Field } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/pages/api/firebase";

import stl from "./Input.module.scss";

interface Props {
  formikProps?: any;
  id: string;
  placeholder: string;
  method?: string;
}

const Input = ({ formikProps, id, placeholder, method }: Props) => {
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleForgotPassword = async () => {
    const email = formikProps.values.email;
    try {
      await emailSchema.validate({ email });
      sendPasswordResetEmail(auth, email)
        .then(() => console.log("Password Reset link sent to", email))
        .catch((err) =>
          console.log("Error while sending Password Reset link", err)
        );
    } catch (error) {
      console.log("Error from Validation:", error);
    }
  };
  const handleFocus = (e: any) => {
    const ele = e.target;
    ele.classList.add(stl.focused);
  };

  const handleBlur = (e: any) => {
    const ele = e.target;
    ele.classList.remove(stl.focused);
  };

  return (
    <div className={stl.inputContainer}>
      <Field
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={stl.input}
        name={id}
        placeholder={placeholder}
        type={id === "password" ? "password" : "text"}
      />
      <span className={stl.errors}>
        {formikProps.touched[id] && formikProps.errors[id]}
      </span>
      {method === "signin" && id === "password" && (
        <span onClick={handleForgotPassword} className={stl.forgotPassword}>
          Forgot Password?
        </span>
      )}
    </div>
  );
};

Input.defaultProps = {
  id: "fname",
  placeholder: "First Name",
};

export default Input;
