import React from "react";

import stl from "./About.module.scss";

const About = ({ theme }: any) => {
  return (
    <div className={stl.about}>
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
