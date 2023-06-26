import React, { useEffect } from "react";
import clsx from "clsx";

import Spinner from "components/spinner";

import stl from "./About.module.scss";

interface Props {
  theme: string;
}

const About = ({ theme }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return isLoading ? (
    <Spinner spinnerColor="#1e90ff" />
  ) : (
    <div
      className={clsx(stl.about, theme === "dark" ? stl.darkAbout : undefined)}
    >
      <div>
        ChatHive is a web-based chat application created by{" "}
        <a href="https://linktr.ee/ranaintizar" target="_blank">
          Rana Intizar
        </a>
        . It is designed to provide users with a seamless messaging experience.
        With its modern and user-friendly interface, ChatHive offers a simple
        yet efficient way to communicate with friends, family, and colleagues.
        The platform supports real-time messaging and allows users to send text
        messages, emojis, and images. ChatHive is built with the latest web
        technologies, making it fast, responsive, and highly reliable. The
        application is accessible from any device with an internet connection,
        making it convenient to stay connected with loved ones and business
        partners on the go. ChatHive is designed to ensure the privacy and
        security of user data, so users can communicate with peace of mind.
      </div>
    </div>
  );
};

export default About;
