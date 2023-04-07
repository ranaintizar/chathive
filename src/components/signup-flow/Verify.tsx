import React from "react";

import Forms from "./customForm";
import Input from "./input";

interface Props {
  theme: string;
  setFlow: (arg: number) => void;
}

const Verify = ({ setFlow, theme }: Props) => {
  const fields = [
    <Input id="verificationCode" placeholder="Verification Code" key={1} />,
  ];
  return (
    <Forms
      theme={theme}
      flow={2}
      height="400px"
      fields={fields}
      initialVals={{ verificationCode: "" }}
      title="Verify"
      desc="Verification code sent to admin@yourdomain.com."
      specialText="Resend"
      setFlow={setFlow}
    />
  );
};

export default Verify;
