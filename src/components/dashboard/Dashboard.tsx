import React, { useEffect } from "react";
import Image from "next/image";

import {
  handleSignOut,
  handleDelAcc,
  handleUpdateEmail,
  handleUpdatePass,
  updatePhoto,
  updateName,
} from "src/lib/firebaseFunctions";
import Spinner from "components/spinner";

import stl from "./Dashboard.module.scss";

const Dashboard = ({ setIsVerified }: any) => {
  const [user, setUser] = React.useState({
    displayName: "",
    email: "",
    photoURL: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    setUser(JSON.parse(data));
    console.log("from get");
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  const handlePhoto = () => {
    console.log("Updating Photo...");
    const input = document.getElementById("photoInput");
    input?.click();
  };

  return (
    <div className={stl.dashboard}>
      {isLoading ? (
        <Spinner spinnerColor="#1e90ff" />
      ) : (
        <div className={stl.content}>
          <div className={stl.name}>
            <h3>Name: </h3>
            <h4 onClick={() => updateName("Rana Aftab Rehan")}>
              {user.displayName}
            </h4>
          </div>
          <div className={stl.email}>
            <h3>Email: </h3>
            <h4>{user.email}</h4>
          </div>
          <Image
            src={user.photoURL}
            width={150}
            height={150}
            alt="profile-image"
            onClick={handlePhoto}
          />
          <input
            id="photoInput"
            type="file"
            style={{ display: "none" }}
            onChange={updatePhoto}
          />
          <div className={stl.btnContainer}>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleDelAcc}>Del Acc</button>
          </div>
          <div className={stl.btnContainer}>
            <button
              onClick={() =>
                handleUpdateEmail("hriam47426@gmail.com", setIsVerified)
              }
            >
              Change Email
            </button>
            <button onClick={() => handleUpdatePass("Hello123#")}>
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
