import React, { useEffect } from "react";
import Image from "next/image";

import { auth } from "@/pages/api/firebase";

import stl from "./Dashboard.module.scss";

const Dashboard = () => {
  const [user, setUser] = React.useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUser({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        console.log("User Successfuly Signed Out");
      })
      .catch((err) => console.log("Error While Signing Out User: ", err));
  };

  return (
    <div className={stl.dashboard}>
      <div className={stl.content}>
        <div className={stl.name}>
          <h3>Name: </h3>
          <h4>{user.displayName}</h4>
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
        />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
