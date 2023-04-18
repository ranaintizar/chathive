import { auth, db, storage } from "@/pages/api/firebase";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import {
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import * as Yup from "yup";

const collectionRef = collection(db, "files");

const sendVerificationEmail = () => {
  //@ts-ignore
  sendEmailVerification(auth.currentUser)
    .then(() => console.log("Verification Email Sent!"))
    .catch((err) =>
      console.log("Error while sending Verification Email:", err)
    );
};

const updateName = (name: string, setUser: (arg: any) => void) => {
  console.log("Updating Name...");
  //@ts-ignore
  updateProfile(auth.currentUser, { displayName: name })
    .then(() => {
      const user = auth.currentUser;
      setUser({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });
      const userData = { ...user };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Name Updated!");
    })
    .catch((err: any) => console.log("Error while Updating Name:", err));
};

const updatePhoto = (setUser: (arg: any) => void, e: any) => {
  const file = e.target.files[0];
  const uid = auth.currentUser?.uid;
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
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          setUser({
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          });
          const userData = { ...user };
          localStorage.setItem("user", JSON.stringify(userData));
        });
      });
    }
  );
};

const handleUpdatePass = (password: string) => {
  console.log("Updating Password...");
  //@ts-ignore
  updatePassword(auth.currentUser, password)
    .then(() => {
      console.log("Password Updated!");
    })
    .catch((err: any) => {
      console.log("Error while updating Password:", err);
      const errCode = err.code;
      const errMsg = err.message;
      handleAuthErrs(errCode, errMsg);
    });
};

const handleUpdateEmail = (
  email: string,
  setIsVerified: (arg: Boolean) => void,
  setUser: (arg: any) => void
) => {
  console.log("Updating Email...");
  //@ts-ignore
  updateEmail(auth.currentUser, email)
    .then(async () => {
      const user = await auth.currentUser;
      setUser({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });
      const userData = { ...user };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Email Updated");
    })
    .then(() => setIsVerified(false))
    .catch((err: any) => console.log("Error while updating Email:", err));
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
      const errCode = err.code;
      const errMsg = err.message;
      handleAuthErrs(errCode, errMsg);
    });
};

const handleSignOut = () => {
  auth
    .signOut()
    .then(() => {
      localStorage.removeItem("user");
      console.log("User Successfuly Signed Out");
    })
    .catch((err) => console.log("Error While Signing Out User: ", err));
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

const handleSignUp = async (
  email: string,
  password: string,
  displayName: string,
  setIsVerified: (arg: Boolean) => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
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
  } else if (code === "auth/requires-recent-login") {
    alert(
      "Sorry, you need to sign in again to perform this action. Please click on the sign-in button to continue."
    );
  }
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

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
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

const handleFile = async (e: any, setIsLoading: (arg: Boolean) => void) => {
  const files = e.target.files;
  const maxFiles = 3;
  if (files.length > maxFiles) {
    alert(`Please select up to ${maxFiles} files.`);
  } else if (files.length <= maxFiles) {
    for (let i = 0; i < files.length; i++) {
      setIsLoading(true);
      const file = files[i];

      const storageRef = ref(
        storage,
        `${process.env.BUCKET}/files/${file.name}`
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
            const fileMeta = (await uploadTask).metadata;

            const fileInfo = {
              fileName: fileMeta.name,
              fileSize: fileMeta.size,
              fileType: fileMeta.contentType,
              fileUrl: url,
            };

            await addDoc(collectionRef, fileInfo)
              .then((docRef) =>
                console.log("Stored info in Firestore document : ", docRef.id)
              )
              .catch((err) => console.log(err));
          });
        }
      );
    }
  }

  setIsLoading(false);
};

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const handleForgotPassword = async (formikProps: any) => {
  const email = formikProps.values.email;
  try {
    await emailSchema.validate({ email });
    sendPasswordResetEmail(auth, email)
      .then(() => console.log("Password Reset link sent to", email))
      .catch((err) =>
        console.log("Error while sending Password Reset link", err)
      );
  } catch (error) {
    console.log("Error from Validation:", error);
  }
};

export {
  updateName,
  updatePhoto,
  handleUpdateEmail,
  handleUpdatePass,
  handleSignOut,
  handleSignIn,
  handleSignUp,
  googleSignIn,
  githubSignIn,
  twitterSignIn,
  handleFile,
  handleForgotPassword,
  handleDelAcc,
  sendVerificationEmail,
};
