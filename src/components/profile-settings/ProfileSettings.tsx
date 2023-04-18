import React, { useEffect } from "react";
import Image from "next/image";

import {
  updatePhoto,
  updateName,
  handleUpdateEmail,
} from "src/lib/firebaseFunctions";
import AlertBox from "components/alert-box";
import Spinner from "components/spinner";
import PromptBox from "components/prompt-box";

import stl from "./ProfileSettings.module.scss";

const ProfileSettings = ({ theme, setIsVerified }: any) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPromptVisible, setIsPropmtVisible] = React.useState(false);
  const [promptName, setPromptName] = React.useState("");
  const [user, setUser] = React.useState({
    displayName: "",
    photoURL: "",
    email: "",
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUser({
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    });
  }, []);

  const handleUploadPhoto = () => {
    const input = document.getElementById("uploadProfPic");
    input?.click();
  };

  const update = (val: string) => {
    console.log("Updating...");

    if (promptName === "displayName") {
      updateName(val, setUser);
    } else if (promptName === "email") {
      handleUpdateEmail(val, setIsVerified, setUser);
    }
    setIsPropmtVisible(false);
  };

  return isLoading ? (
    <Spinner spinnerColor="#1e90ff" />
  ) : (
    <div className={stl.profile}>
      <div onClick={() => setIsVisible(true)} className={stl.imgContainer}>
        <Image
          src={user.photoURL}
          width={190}
          height={190}
          alt="profile-image"
          className={stl.image}
        />
      </div>
      <input
        type="file"
        id="uploadProfPic"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => updatePhoto(setUser, e)}
      />
      <AlertBox
        theme={theme}
        visible={isVisible}
        title="Change Photo"
        cancelBtn={true}
        titleColor="#1e90ff"
        msg="Are you sure you want to change your profile photo?"
        cancelLabel="Cancel"
        btnLabel="Upload"
        maxWidth={400}
        handleOnClick={() => {
          handleUploadPhoto();
          setIsVisible(false);
        }}
        handleCancel={() => setIsVisible(false)}
      />
      <div className={stl.info}>
        <div className={stl.field}>
          <span className={stl.label}>Name:</span>
          <span className={stl.title}>{user.displayName}</span>
          <div className={stl.btnContainer}>
            <button
              onClick={() => {
                setPromptName("displayName");
                setIsPropmtVisible(true);
              }}
            >
              Change
            </button>
          </div>
        </div>
        <div className={stl.field}>
          <span className={stl.label}>Email:</span>
          <span className={stl.title}>{user.email}</span>
          <div className={stl.btnContainer}>
            <button
              onClick={() => {
                setPromptName("email");
                setIsPropmtVisible(true);
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <PromptBox
        theme={theme}
        name={promptName}
        visible={isPromptVisible}
        handleCancelClick={() => setIsPropmtVisible(false)}
        handleOkClick={update}
      />
    </div>
  );
};

export default ProfileSettings;
