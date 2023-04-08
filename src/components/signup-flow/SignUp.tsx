import React from "react";

import Forms from "./customForm";
import Input from "./input";

interface Props {
  theme: string;
  setFlow: (arg: number) => void;
}

const SignUp = ({ setFlow, theme }: Props) => {
  const fields = [
    <Input id="fname" key={1} />,
    <Input id="lname" placeholder="Last Name" key={2} />,
    <Input id="email" placeholder="Email" key={3} />,
    <Input id="password" placeholder="Password" key={4} />,
  ];

  return (
    <Forms
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
