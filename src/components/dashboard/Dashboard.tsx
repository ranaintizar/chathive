import React, { useEffect } from "react";
import Image from "next/image";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { auth, storage } from "@/pages/api/firebase";
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

  const getCurrentUser = async () => {
    const user = await auth.currentUser;
    return user;
  };

  // getCurrentUser();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        console.log("User Successfuly Signed Out");
      })
      .catch((err) => console.log("Error While Signing Out User: ", err));
  };

  const handleDelAcc = () => {
    const user = auth.currentUser;
    user
      ?.delete()
      .then(() => {
        localStorage.clear();
        console.log("Successfule deleted!");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/requires-recent-login") {
          alert(
            "Sorry, you need to sign in again to perform this action. Please click on the sign-in button to continue."
          );
        }
      });
  };

  // const showUser = async () => {
  //   console.log(await getCurrentUser());
  // };

  // showUser();

  const handleUpdateEmail = () => {
    console.log("Updating Email...");
    //@ts-ignore
    updateEmail(auth.currentUser, "hriam47426@gmail.com")
      .then(async () => {
        const user = await getCurrentUser();
        const userData = { ...user };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Email Updated");
      })
      .then(() => setIsVerified(false))
      .catch((err) => console.log("Error while updating Email:", err));
  };

  const handleUpdatePass = () => {
    console.log("Updating Password...");
    //@ts-ignore
    updatePassword(auth.currentUser, "Hello123#")
      .then(() => {
        console.log("Password Updated!");
      })
      .catch((error) => {
        console.log("Error while updating Password:", error);
        if (error.code === "auth/requires-recent-login") {
          alert(
            "Sorry, you need to sign in again to perform this action. Please click on the sign-in button to continue."
          );
        }
      });
  };

  const updatePhoto = () => {
    console.log("Updating Photo...");
    const input = document.getElementById("photoInput");
    input?.click();
  };

  const handlePhoto = (e: any) => {
    const file = e.target.files[0];
    const uid = auth.currentUser?.uid;
    if (file.type.includes("image")) {
      const profilePicRef = ref(
        storage,
        `${process.env.BUCKET}/files/${uid}/profilePic`
      );

      deleteObject(profilePicRef)
        .then((res) => {
          console.log(res);
          console.log("File Deleted Successfully!");
        })
        .catch((err) => {
          console.log("Error while deleting file:", err);
        });

      const storageRef = ref(
        storage,
        `${process.env.BUCKET}/files/${uid}/profilePic`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log("Upload successful");

          getDownloadURL(storageRef).then(async (url) => {
            console.log("Url is: ", url);
            //@ts-ignore
            updateProfile(auth.currentUser, { photoURL: url }).then(() => {
              const user = auth.currentUser;
              const userData = { ...user };
              localStorage.setItem("user", JSON.stringify(userData));
            });
          });
        }
      );
    } else {
      alert("Invalid file type selected. Please select an image file.");
    }
  };

  const updateName = () => {
    console.log("Updating Name...");
    //@ts-ignore
    updateProfile(auth.currentUser, { displayName: "Rana Aftab Rehan" })
      .then(() => {
        const user = auth.currentUser;
        const userData = { ...user };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Name Updated!");
      })
      .catch((err) => console.log("Error while Updating Name:", err));
  };

  return (
    <div className={stl.dashboard}>
      {isLoading ? (
        <Spinner spinnerColor="#1e90ff" />
      ) : (
        <div className={stl.content}>
          <div className={stl.name}>
            <h3>Name: </h3>
            <h4 onClick={updateName}>{user.displayName}</h4>
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
            onClick={updatePhoto}
          />
          <input
            id="photoInput"
            type="file"
            style={{ display: "none" }}
            onChange={handlePhoto}
          />
          <div className={stl.btnContainer}>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleDelAcc}>Del Acc</button>
          </div>
          <div className={stl.btnContainer}>
            <button onClick={handleUpdateEmail}>Change Email</button>
            <button onClick={handleUpdatePass}>Change Password</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
