import React, { useEffect } from "react";
import clsx from "clsx";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Verify from "./Verify";

import stl from "./SignupFlow.module.scss";

interface Props {
  theme: string;
  setIsVerified: (arg: Boolean) => void;
}

const SignupFlow = ({ theme, setIsVerified }: Props) => {
  const [flow, setFlow] = React.useState(0);
  const [element, setElement] = React.useState(
    <SignUp setIsVerified={setIsVerified} setFlow={setFlow} theme={theme} />
  );

  useEffect(() => {
    if (flow === 0) {
      setElement(
        <SignUp setIsVerified={setIsVerified} theme={theme} setFlow={setFlow} />
      );
    } else if (flow === 1) {
      setElement(
        <SignIn setIsVerified={setIsVerified} theme={theme} setFlow={setFlow} />
      );
    } else if (flow === 2) {
      setElement(<Verify theme={theme} setFlow={setFlow} />);
    }
  }, [flow]);

  return (
    <div
      className={clsx(
        stl.signupFlow,
        theme === "dark" ? stl.darkSignUpFlow : undefined
      )}
    >
      {element}
    </div>
  );
};

export default SignupFlow;
