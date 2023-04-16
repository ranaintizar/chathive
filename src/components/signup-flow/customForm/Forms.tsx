import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/pages/api/firebase";
import Input from "../input";
import Spinner from "components/spinner";
import GoogleIcon from "assets/google.svg";
import TwitterIcon from "assets/twitter.svg";
import GithubIcon from "assets/github.svg";

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
  method?: string;
  setIsVerified: (arg: Boolean) => void;
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
  method,
  setFlow,
  setIsVerified,
}: Props) => {
  const [color, setColor] = React.useState("");
  const [loading, setLoading] = React.useState(true);

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

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        const data = { ...user };
        await localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        handleAuthErrs(errCode, errMsg);
      });
  };

  const twitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const credential = TwitterAuthProvider.credentialFromResult(result);
        console.log("Credential : ", credential, "from Twitter Login");
        const credData = { ...credential };
        await localStorage.setItem("credential", JSON.stringify(credData));
        console.log(user);
        const data = { ...user };
        await localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        handleAuthErrs(errCode, errMsg);
      });
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        const data = { ...user };
        await localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        handleAuthErrs(errCode, errMsg);
      });
  };

  const handleAuthErrs = (code: any, msg: any) => {
    console.log("Code: ", code);
    console.log("Message: ", msg);
    if (code === "auth/email-already-in-use") {
      alert("This is email is already in use.");
    } else if (code === "auth/wrong-password") {
      alert("Password is In-correct");
    } else if (code === "auth/user-not-found") {
      alert(
        "The user with this email does not exist. Please check the email or sign up if you are a new user."
      );
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        return await updateProfile(user, {
          displayName: displayName,
          photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
        });
      })
      .then(async () => {
        const userData = await auth.currentUser;
        //@ts-ignore
        sendEmailVerification(userData).then(() => {
          setIsVerified(false);
        });
        const user = { ...userData };
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        handleAuthErrs(errCode, errMsg);
      });
  };

  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const user = credential.user;
        const userData = { ...user };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User Signed In Successfully!");
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        handleAuthErrs(errCode, errMsg);
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
              if (method === "signup") {
                handleSignUp(
                  //@ts-ignore
                  values.email,
                  //@ts-ignore
                  values.password,
                  //@ts-ignore
                  values.fname + " " + values.lname
                );
              } else if (method === "signin") {
                //@ts-ignore
                handleSignIn(values.email, values.password);
              }
              actions.resetForm();
            }}
          >
            {(props: any) => (
              <Form>
                {fields.map((field: any) => (
                  <Input
                    method={method}
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
            <div className={stl.btnContainer}>
              <button onClick={googleSignIn}>
                <GoogleIcon />
              </button>
              <button onClick={twitterSignIn}>
                <TwitterIcon />
              </button>
              <button onClick={githubSignIn}>
                <GithubIcon />
              </button>
            </div>
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
