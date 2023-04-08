import React, { useEffect } from "react";
import clsx from "clsx";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Verify from "./Verify";

import stl from "./SignupFlow.module.scss";

interface Props {
  theme: string;
}

const SignupFlow = ({ theme }: Props) => {
  const [flow, setFlow] = React.useState(0);
  const [element, setElement] = React.useState(
    <SignUp setFlow={setFlow} theme={theme} />
  );

  useEffect(() => {
    if (flow === 0) {
      setElement(<SignUp theme={theme} setFlow={setFlow} />);
    } else if (flow === 1) {
      setElement(<SignIn theme={theme} setFlow={setFlow} />);
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
