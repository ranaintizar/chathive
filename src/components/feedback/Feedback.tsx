import React, { useEffect } from "react";
import clsx from "clsx";

import { Field, Form, Formik } from "formik";
import SendIcon from "assets/send.svg";

import stl from "./Feedback.module.scss";
import Spinner from "components/spinner";

const Feedback = ({ theme }: any) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return isLoading ? (
    <Spinner spinnerColor="#1e90ff" />
  ) : (
    <div
      className={clsx(
        stl.feedback,
        theme === "dark" ? stl.darkFeedback : undefined
      )}
    >
      <Formik
        initialValues={{ username: "", email: "", feedback: "" }}
        onSubmit={(values, actions: any) => {
          console.log(values);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            className={stl.input}
            placeholder="Type Your Name"
            required
            name="username"
          />
          <Field
            className={stl.input}
            placeholder="Type Your Email"
            required
            type="email"
            name="email"
          />
          <Field
            className={stl.textArea}
            required
            as="textarea"
            name="feedback"
            placeholder="Your feedback helps us to serve you better. Please leave your comments here."
          />
          <button type="submit">
            Send <SendIcon />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Feedback;
