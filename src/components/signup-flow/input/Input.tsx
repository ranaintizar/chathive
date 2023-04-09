import React from "react";
import { Field } from "formik";

import stl from "./Input.module.scss";

interface Props {
  formikProps?: any;
  id: string;
  placeholder: string;
}

const Input = ({ formikProps, id, placeholder }: Props) => {
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
      />
      <span className={stl.errors}>
        {formikProps.touched[id] && formikProps.errors[id]}
      </span>
    </div>
  );
};

Input.defaultProps = {
  id: "fname",
  placeholder: "First Name",
};

export default Input;
