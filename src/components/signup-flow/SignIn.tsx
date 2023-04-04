import React from "react";

import Forms from "./customForm";
import Input from "./input";

const SignIn = ({ setFlow }: any) => {
  const fields = [
    <Input id="email" placeholder="Email" key={1} />,
    <Input id="password" placeholder="Password" key={2} />,
  ];
  return (
    <Forms
      flow={1}
      height="470px"
      fields={fields}
      initialVals={{ email: "", password: "" }}
      title="Sign In"
      desc="Don't have an Account?"
      specialText="Sign Up"
      setFlow={setFlow}
    />
  );
};

export default SignIn;
