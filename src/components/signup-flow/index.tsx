import React from "react";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Verify from "./Verify";

import stl from "./SignupFlow.module.scss";

const SignupFlow = () => {
  const [flow, setFlow] = React.useState(0);
  const [element, setElement] = React.useState(<SignUp setFlow={setFlow} />);

  React.useEffect(() => {
    if (flow === 0) {
      setElement(<SignUp setFlow={setFlow} />);
    } else if (flow === 1) {
      setElement(<SignIn setFlow={setFlow} />);
    } else if (flow === 2) {
      setElement(<Verify setFlow={setFlow} />);
    }
  }, [flow]);

  return <div className={stl.signupFlow}>{element}</div>;
};

export default SignupFlow;
