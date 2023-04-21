import React from "react";
import * as Yup from "yup";

import Forms from "./customForm";

interface Props {
  theme: string;
  setFlow: (arg: number) => void;
  setIsVerified: (arg: Boolean) => void;
}

const SignUp = ({ setFlow, theme, setIsVerified }: Props) => {
  const fields = [
    { id: "fname", placeholder: "First Name", key: 1 },
    { id: "lname", placeholder: "Last Name", key: 2 },
    { id: "email", placeholder: "Email", key: 3 },
    { id: "password", placeholder: "Password", key: 4 },
  ];

  const schema = Yup.object().shape({
    fname: Yup.string()
      .min(4, "Name must be at least 4 characters")
      .required("Name is required"),
    lname: Yup.string().min(4, "Name must be at least 4 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .matches(/[A-Z]/, "Password must contain at least 1 capital letter")
      .required("Password is required"),
  });

  return (
    <Forms
      method="signup"
      schema={schema}
      theme={theme}
      flow={0}
      fields={fields}
      initialVals={{ fname: "", lname: "", email: "", password: "" }}
      others={true}
      setFlow={setFlow}
    />
  );
};

export default SignUp;
