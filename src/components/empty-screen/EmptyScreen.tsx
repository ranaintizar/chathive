import React from "react";
import Image from "next/image";

import stl from "./EmptyScreen.module.scss";

const EmptyScreen = () => {
  return (
    <div className={stl.emptyScreen}>
      <Image
        priority
        src="/empty-chat.png"
        width={300}
        height={300}
        alt="Empty-Screen"
      />
      <h2>No messages to show.</h2>
    </div>
  );
};

export default EmptyScreen;
