import React, { useEffect } from "react";
import Image from "next/image";

import { updatePhoto } from "src/lib/firebaseFunctions";
import AlertBox from "components/alert-box";
import Spinner from "components/spinner";
import Field from "components/field";
import EditIcon from "assets/edit.svg";

import stl from "./ProfileSettings.module.scss";

interface Props {
  theme: string;
  setIsVerified: (arg: Boolean) => void;
}

const ProfileSettings = ({ theme, setIsVerified }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
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
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
    });
  }, []);

  const handleUploadPhoto = () => {
    const input = document.getElementById("uploadProfPic");
    input?.click();
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
        <span className={stl.iconContainer}>
          <EditIcon className={stl.icon} />
        </span>
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
        <Field
          theme={theme}
          title="Name"
          name="displayName"
          setUser={setUser}
          setIsVerified={setIsVerified}
          content={user.displayName}
          btnLabel="Change"
        />
        <Field
          theme={theme}
          title="Email"
          name="email"
          setUser={setUser}
          setIsVerified={setIsVerified}
          content={user.email}
          btnLabel="Change"
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
