import React from "react";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Verify from "./Verify";

import stl from "./SignupFlow.module.scss";

const SignupFlow = () => {
  const [flow, setFlow] = React.useState(0);
  const [element, setElement] = React.useState(<SignUp setFlow={setFlow} />);
  const [theme, setTheme] = React.useState("dark");

  React.useEffect(() => {
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
      style={
        theme === "dark"
          ? { background: "linear-gradient(147deg, #000000 0%, #434343 74%)" }
          : {
              background:
                "linear-gradient(-45deg,#667db6,#0082c8,#0082c8,#667db6)",
            }
      }
      className={stl.signupFlow}
    >
      {element}
    </div>
  );
};

export default SignupFlow;
