import React from "react";

import stl from "./VerifyMsg.module.scss";

const VerifyMsg = ({ email }: any) => {
  return (
    <div className={stl.verifyMsg}>
      <h2>
        Verification email sent to <span>{email}</span>.
      </h2>
      <h2>Verify your Email to Continue!</h2>
    </div>
  );
};

export default VerifyMsg;
