import Forms from "./customForm";
import Input from "./input";

const Verify = ({ setFlow }: any) => {
  const fields = [
    <Input id="verificationCode" placeholder="Verification Code" key={1} />,
  ];
  return (
    <Forms
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
