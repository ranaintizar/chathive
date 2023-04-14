import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Input from "../input";
import Spinner from "components/spinner";
import GoogleIcon from "assets/google.svg";

import stl from "./Forms.module.scss";

interface Props {
  title?: string;
  desc?: string;
  specialText?: string;
  initialVals: Object;
  submitText?: string;
  others?: Boolean;
  height?: string;
  width?: string;
  fields: Array<Object>;
  setFlow: (arg: any) => void;
  flow: number;
  theme: string;
  schema: Object;
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
  theme,
  schema,
  setFlow,
}: Props) => {
  const [color, setColor] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (flow === 0) {
      setColor("rgba(255, 0, 0, 0.7)");
    } else if (flow === 1) {
      setColor("rgba(255, 225, 0, 0.737)");
    } else if (flow === 2) {
      setColor("rgba(0,128,0, 0.8)");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const GoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = await result.user;
        console.log(user);
        //@ts-ignore
        const data = { ...user };
        await localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ":", errorMessage);
      });
  };

  return loading ? (
    theme === "dark" ? (
      <Spinner color="#1e90ff" />
    ) : (
      <Spinner color="#fff" />
    )
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
            validationSchema={schema}
            validateOnBlur={true}
            onSubmit={(values, actions) => {
              console.log(values, "this");
              setFlow(2);
              actions.resetForm();
            }}
          >
            {(props: any) => (
              <Form>
                {fields.map((field: any) => (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    key={field.key}
                    formikProps={props}
                  />
                ))}
                <button className={stl.submitBtn} type="submit">
                  {submitText}
                </button>
              </Form>
            )}
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
            <button onClick={GoogleSignIn}>
              <GoogleIcon />
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
  submitText: "Sign Up",
  height: "550px",
};

export default CustomForm;
