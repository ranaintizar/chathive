import { Formik, Form, FormikProps } from "formik";
import { motion } from "framer-motion";
import Input from "../input";
import Spinner from "components/spinner";

import stl from "./Forms.module.scss";
import { useEffect, useState } from "react";

interface Props {
  title?: string;
  desc?: string;
  specialText?: string;
  initialVals: Object;
  submitText?: string;
  others?: Boolean;
  height?: string;
  width?: string;
  fields: Array<JSX.Element>;
  setFlow: (arg: any) => void;
  flow: number;
}

const CustomForm = ({
  title,
  desc,
  specialText,
  initialVals,
  submitText,
  others,
  height,
  width,
  fields,
  flow,
  setFlow,
}: Props) => {
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (flow === 0) {
      setColor("rgb(255, 0, 0, 0.8)");
    } else if (flow === 1) {
      setColor("rgba(255, 225, 0, 0.737)");
    } else if (flow === 2) {
      setColor("green");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className={stl.signUp}>
      <motion.div
        initial={{ scale: 0, opacity: 0, top: -500 }}
        animate={{ scale: 1, opacity: 1, top: 70 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 100,
        }}
        style={{ background: color }}
        className={stl.circle}
      />
      <div style={{ height, width }} className={stl.container}>
        <motion.div
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className={stl.titleContainer}
        >
          <h1>{title}</h1>
          <span>
            {desc}{" "}
            <span
              className={stl.specialText}
              onClick={() => setFlow((flow: number) => (flow === 0 ? 1 : 0))}
            >
              {specialText}
            </span>
          </span>
        </motion.div>
        <motion.div
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className={stl.formContainer}
        >
          <Formik
            initialValues={initialVals}
            onSubmit={(values, actions) => {
              console.log(values);
              setFlow(2);
              actions.resetForm();
            }}
            validateOnBlur={true}
          >
            <Form>
              {fields.map((field: JSX.Element) => field)}
              <button className={stl.submitBtn} type="submit">
                {submitText}
              </button>
            </Form>
          </Formik>
        </motion.div>
        {others && (
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className={stl.otherSignIn}
          >
            <span>OR Continue with</span>
            <button onClick={() => console.log("Button Clicked...")}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.9375 15.3019C27.9375 14.4094 27.8644 13.5131 27.7106 12.6356H15.2606V17.6887H22.3894C22.2423 18.4974 21.9327 19.2678 21.4792 19.9533C21.0257 20.6388 20.4379 21.2251 19.7512 21.6769V24.9581H24.0056C26.5031 22.6706 27.9375 19.2956 27.9375 15.3019Z"
                  fill="#4285F4"
                />
                <path
                  d="M15.2625 28.125C18.8213 28.125 21.8231 26.9625 24.0094 24.9563L19.7569 21.6769C18.5737 22.4775 17.0456 22.9312 15.2663 22.9312C11.8238 22.9312 8.90438 20.6213 7.85625 17.5163H3.46875V20.8969C4.57425 23.0742 6.26172 24.9024 8.34369 26.1784C10.4257 27.4544 12.8206 28.1282 15.2625 28.125Z"
                  fill="#34A853"
                />
                <path
                  d="M7.85063 17.5163C7.29771 15.8869 7.29771 14.1206 7.85063 12.4913V9.11063H3.46688C2.54371 10.9379 2.06274 12.9565 2.06274 15.0038C2.06274 17.051 2.54371 19.0696 3.46688 20.8969L7.85063 17.5163Z"
                  fill="#FBBC04"
                />
                <path
                  d="M15.2625 7.06875C17.1424 7.03827 18.9596 7.74495 20.325 9.0375L24.0938 5.28938C21.6986 3.05824 18.5356 1.83604 15.2625 1.87688C12.8199 1.87378 10.4244 2.54828 8.3423 3.82535C6.26019 5.10241 4.57314 6.932 3.46875 9.11063L7.84875 12.4875C8.89125 9.37875 11.8162 7.06875 15.2587 7.06875H15.2625Z"
                  fill="#EA4335"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

CustomForm.defaultProps = {
  title: "Create Account",
  desc: "Already have an Account?",
  specialText: "Sign In",
  initialVals: {
    fname: "",
    lname: "",
    email: "",
    password: "",
    verficationCode: "",
  },
  submitText: "Sign Up",
  height: "550px",
  fields: [
    // @ts-ignore
    <Input formikProps={FormikProps} key={0} />,
    // @ts-ignore
    <Input id="verificationCode" formikProps={FormikProps} key={1} />,
    <Input
      id="lname"
      placeholder="Last Name"
      // @ts-ignore
      formikProps={FormikProps}
      key={2}
    />,
    <Input
      id="email"
      placeholder="Email"
      // @ts-ignore
      formikProps={FormikProps}
      key={3}
    />,
    <Input
      id="password"
      placeholder="Password"
      // @ts-ignore
      formikProps={FormikProps}
      key={4}
    />,
  ],
};

export default CustomForm;
