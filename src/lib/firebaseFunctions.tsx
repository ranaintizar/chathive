import { auth, db, storage } from "@/pages/api/firebase";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
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
import { generateRandomString } from ".";
import * as Yup from "yup";

const feedbackRef = collection(db, "feedback");

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
      alert("Password Changed Successfully!");
    })
    .catch((err: any) => {
      console.log("Error while updating Password:", err);
      const errCode = err.code;
      const errMsg = err.message;
      handleAuthErrs(errCode, errMsg);
    });
};

const handleUpdateEmail = (email: string, setUser: (arg: any) => void) => {
  console.log("Updating Email...");
  //@ts-ignore
  updateEmail(auth.currentUser, email)
    .then(async () => {
      const user = await auth.currentUser;
      //@ts-ignore
      sendEmailVerification(user)
        .then(() => console.log("Verification Email Sent!"))
        .catch((err) =>
          console.log(
            "Error while sending verification email from Update Email:",
            err
          )
        );
      setUser({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });
      const userData = { ...user };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Email Updated");
    })
    .then(() => console.log("Email Updated!"))
    .catch((err: any) => {
      handleAuthErrs(err.code, err.message);
      console.log("Error while updating Email:", err);
    });
};

const handleDelAcc = () => {
  const user = auth.currentUser;
  const profilePicRef = ref(
    storage,
    `${process.env.BUCKET}/files/${user?.uid}/profilePic`
  );

  deleteObject(profilePicRef)
    .then((res) => {
      console.log(res);
      console.log("File Deleted Successfully!");
    })
    .catch((err) => {
      console.log("Error while deleting file:", err);
    });
  user
    ?.delete()
    .then(() => {
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
  displayName: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const userDoc = doc(db, "users", user?.uid);
      setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
        .then(() => console.log("Added User Doc!"))
        .catch((err) => console.log("Error while adding User Doc", err));
      // const chatDoc = doc(userDoc, "chats", user.uid + user.uid);
      // const msgsRef = collection(chatDoc, "messages");
      // const id = generateRandomString(20);
      // const msgDoc = doc(msgsRef, id);
      // await setDoc(msgDoc, {
      //   messageContent: "Welcome to ChatHive.",
      //   messageType: "text",
      //   senderID: id,
      //   time: serverTimestamp(),
      //   username: "ChatHive",
      // })
      //   .then(() => console.log("Added Dummy Message!"))
      //   .catch((err) => console.log("Error while adding dummy message.", err));

      return await updateProfile(user, {
        displayName: displayName,
        photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
      });
    })
    .then(async () => {
      const userData = await auth.currentUser;
      //@ts-ignore
      sendEmailVerification(userData).then(async () => {
        console.log("Verification Email sent from SignUp");
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

const addFileMsg = async (
  fileInfo: any,
  uid: string,
  name: string,
  chatId: string
) => {
  const messageContent = { ...fileInfo };
  const messageType = "file";
  const senderId = uid;
  const time = serverTimestamp();
  const username = name;
  const id = generateRandomString(20);

  const userDoc = doc(db, "users", uid);
  const chatDoc = doc(userDoc, "chats", chatId);
  const msgsRef = collection(chatDoc, "messages");
  const docRef = doc(msgsRef, id);

  await setDoc(docRef, {
    messageContent,
    messageType,
    senderId,
    time,
    username,
  })
    .then(() => {
      console.log("Document added successfully!");
    })
    .catch((err) => {
      console.error("Error while adding document:", err);
    });
};

const handleFile = async (
  e: any,
  setIsLoading: (arg: any) => void,
  uid: string,
  name: string,
  chatId: string
) => {
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
              fileURL: url,
            };

            addFileMsg(fileInfo, uid, name, chatId);
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
      .then(() => alert(`Password Reset link sent to ${email}`))
      .catch((err) =>
        console.log("Error while sending Password Reset link", err)
      );
  } catch (error: any) {
    if (error.message === "Email is required") {
      alert("Enter email then click on Forgot Password");
    } else if (error.message === "Invalid email address") {
      alert("Enter email is not valid");
    }
    console.log("Error from Validation:", { error });
  }
};

const addFeedback = async (name: string, email: string, msg: string) => {
  await addDoc(feedbackRef, { name, email, msg })
    .then(() => alert("Feedback Sent!"))
    .catch((err) =>
      console.log("Error while adding Feedback in Firestore", err)
    );
};

const handleDelMsg = async (uid: string, chatId: string, msgId: string) => {
  const userDoc = doc(db, "users", uid);
  const chatRef = doc(userDoc, "chats", chatId);
  const msgRef = doc(chatRef, "messages", msgId);
  await deleteDoc(msgRef)
    .then(() => alert("Message Deleted Successfully!"))
    .catch((err) => console.log("Error while Deleting Message", err));
};

const addTextMsg = async (
  msg: string,
  uid: string,
  name: string,
  chatId: string
) => {
  const messageContent = msg;
  const messageType = "text";
  const senderId = uid;
  const time = serverTimestamp();
  const username = name;
  const id = generateRandomString(20);

  const userDoc = doc(db, "users", uid);
  const chatsRef = collection(userDoc, "chats");
  const chatsDoc = doc(chatsRef, chatId);
  const msgsRef = collection(chatsDoc, "messages");
  const docRef = doc(msgsRef, id);

  await setDoc(docRef, {
    messageType,
    messageContent,
    senderId,
    time,
    username,
  })
    .then(() => {
      console.log("Document added successfully!");
    })
    .catch((err) => {
      console.error("Error while adding document:", err);
    });
};

const handleGifSubmit = async (
  src: string,
  uid: string,
  name: string,
  chatId: string
) => {
  console.log(src);
  const messageContent = src;
  const messageType = "gif";
  const senderId = uid;
  const time = serverTimestamp();
  const username = name;
  const id = generateRandomString(20);

  const userDoc = doc(db, "users", uid);
  const chatsRef = collection(userDoc, "chats");
  const chatsDoc = doc(chatsRef, chatId);
  const msgsRef = collection(chatsDoc, "messages");
  const docRef = doc(msgsRef, id);

  await setDoc(docRef, {
    messageType,
    messageContent,
    senderId,
    time,
    username,
  })
    .then(() => {
      console.log("Document added successfully!");
    })
    .catch((err) => {
      console.error("Error while adding document:", err);
    });
};

const deleteFile = async (fileName: string) => {
  const fileRef = ref(storage, `${process.env.BUCKET}/files/${fileName}`);

  await deleteObject(fileRef)
    .then((res) => {
      console.log(res);
      console.log("File Deleted Successfully!");
    })
    .catch((err) => {
      console.log("Error while deleting file:", err);
    });
};

const downloadFile = (fileInfo: any) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var blob = xhr.response;
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = fileInfo.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (xhr.status === 404) {
        console.log("File Not Found");
      } else if (xhr.status === 0) {
        console.log("Network Disconnected");
      }
    }
  };
  xhr.open("GET", fileInfo.fileURL);
  xhr.send();
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
  addFeedback,
  handleDelMsg,
  addTextMsg,
  handleGifSubmit,
  deleteFile,
  downloadFile,
};
