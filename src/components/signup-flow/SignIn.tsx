import React from "react";
import * as Yup from "yup";

import Forms from "./customForm";

interface Props {
  theme: string;
  setFlow: (arg: number) => void;
}

const SignIn = ({ setFlow, theme }: Props) => {
  const fields = [
    { id: "email", placeholder: "Email", key: 1 },
    { id: "password", placeholder: "Password", key: 2 },
  ];

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.mixed().required("Password is required"),
  });
  return (
    <Forms
      method="signin"
      schema={schema}
      theme={theme}
      flow={1}
      height="430px"
      fields={fields}
      initialVals={{ email: "", password: "" }}
      title="Sign In"
      desc="Don't have an Account?"
      specialText="Sign Up"
      setFlow={setFlow}
      others={true}
      submitText="Sign In"
    />
  );
};

export default SignIn;
