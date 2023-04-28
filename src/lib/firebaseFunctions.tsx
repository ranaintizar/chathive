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
  getDocs,
  updateDoc,
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
const chatsRef = collection(db, "chats");
const toastDoc = doc(db, "toast", "Zr41YsymL2m0Y26ShAnZ");

const sendVerificationEmail = () => {
  //@ts-ignore
  sendEmailVerification(auth.currentUser)
    .then(async () => {
      console.log("Verification Email Sent!");
      await updateToast("Verification email sent.", "success");
    })
    .catch((err) =>
      console.log("Error while sending Verification Email:", err)
    );
};

const updateName = (name: string, setUser: (arg: any) => void) => {
  console.log("Updating Name...");
  //@ts-ignore
  updateProfile(auth.currentUser, { displayName: name })
    .then(async () => {
      const user = auth.currentUser;
      setUser({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });
      const userData = { ...user };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Name Updated!");
      await updateToast("Name changed successfully.", "success");
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
    .then(() => console.log("File Deleted Successfully!"))
    .catch((err) => console.log("Error while deleting file:", err));

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
        updateProfile(auth.currentUser, { photoURL: url }).then(async () => {
          const user = auth.currentUser;
          setUser({
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          });
          const userData = { ...user };
          localStorage.setItem("user", JSON.stringify(userData));
          await updateToast("Photo changed successfully.", "success");
        });
      });
    }
  );
};

const handleUpdatePass = (password: string) => {
  console.log("Updating Password...");
  //@ts-ignore
  updatePassword(auth.currentUser, password)
    .then(async () => {
      console.log("Password Updated!");
      await updateToast("Password changed successfully.", "success");
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
      await updateToast("Email changed successfully.", "success");
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
  const id = user?.uid;

  user
    ?.delete()
    .then(async () => {
      //@ts-ignore
      const userDoc = doc(db, "users", id);
      deleteDoc(userDoc)
        .then(() => console.log("Deleted user Doc Successfully!"))
        .catch((err) => console.log("Error while deleting user Doc", err));

      const profilePicRef = ref(
        storage,
        `${process.env.BUCKET}/files/${id}/profilePic`
      );

      deleteObject(profilePicRef)
        .then((res) => {
          console.log(res);
          console.log("File Deleted Successfully!");
        })
        .catch((err) => console.log("Error while deleting file:", err));
      localStorage.clear();
      console.log("User successfully deleted!");
      await updateToast("Account deleted successfully.", "success");
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
    .then(async () => {
      localStorage.removeItem("user");
      console.log("User Successfuly Signed Out");
      await updateToast("Logged out successfully.", "success");
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
      handleSigninSucess();
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
        //@ts-ignore
        const userDoc = doc(db, "users", userData?.uid);
        await setDoc(userDoc, {
          displayName: userData?.displayName,
          email: userData?.email,
          photoURL: userData?.photoURL,
        })
          .then(async () => console.log("Added User Doc!"))
          .catch((err) => console.log("Error while adding User Doc", err));
      });
      const user = { ...userData };
      localStorage.setItem("user", JSON.stringify(user));
      await updateToast("Signed up successfully.", "success");
    })
    .catch((err) => {
      const errCode = err.code;
      const errMsg = err.message;
      handleAuthErrs(errCode, errMsg);
    });
};

const handleAuthErrs = async (code: any, msg: any) => {
  console.log("Code: ", code);
  console.log("Message: ", msg);
  if (code === "auth/email-already-in-use") {
    await updateToast("Email already in use.", "failed");
  } else if (code === "auth/wrong-password") {
    await updateToast("Password is incorrect.", "failed");
  } else if (code === "auth/user-not-found") {
    await updateToast("No Account with this email.", "failed");
  } else if (code === "auth/requires-recent-login") {
    await updateToast("Sign in again to do this.", "failed");
  }
};

const githubSignIn = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = auth.currentUser;
      const data = { ...user };
      //@ts-ignore
      const userDoc = doc(db, "users", data?.uid);
      await setDoc(userDoc, {
        displayName: data?.displayName,
        email: data?.email,
        photoURL: data?.photoURL,
      })
        .then(async () => {
          console.log("Added User Doc!");
          await localStorage.setItem("user", JSON.stringify(data));
          handleSigninSucess();
        })
        .catch((err) => console.log("Error while adding User Doc", err));
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
      const credential = TwitterAuthProvider.credentialFromResult(result);
      console.log("Credential : ", credential, "from Twitter Login");
      const credData = { ...credential };
      await localStorage.setItem("credential", JSON.stringify(credData));
      const user = auth.currentUser;
      console.log(user);
      const data = { ...user };
      //@ts-ignore
      const userDoc = doc(db, "users", data?.uid);
      await setDoc(userDoc, {
        displayName: data?.displayName,
        email: data?.email,
        photoURL: data?.photoURL,
      })
        .then(async () => console.log("Added User Doc!"))
        .catch((err) => console.log("Error while adding User Doc", err));
      await localStorage.setItem("user", JSON.stringify(data));
      handleSigninSucess();
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
      const user = auth.currentUser;
      console.log(user);
      const data = { ...user };
      //@ts-ignore
      const userDoc = doc(db, "users", data?.uid);
      await setDoc(userDoc, {
        displayName: data?.displayName,
        email: data?.email,
        photoURL: data?.photoURL,
      })
        .then(async () => console.log("Added User Doc!"))
        .catch((err) => console.log("Error while adding User Doc", err));
      await localStorage.setItem("user", JSON.stringify(data));
      handleSigninSucess();
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

  const chatDoc = doc(chatsRef, chatId);
  const msgsRef = collection(chatDoc, "messages");
  const docRef = doc(msgsRef, id);

  await setDoc(docRef, {
    messageContent,
    messageType,
    senderId,
    time,
    username,
  })
    .then(async () => {
      console.log("Document added successfully!");
      handleMsgSent();
    })
    .catch((err) => console.error("Error while adding document:", err));
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
      const file = files[i];
      if (file.size > 25 * 1024 * 1024) {
        alert("File is too large. Maximum file size is 25MB");
        return;
      }

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
      .then(async () => {
        console.log(`Password Reset link sent to ${email}`);
        await updateToast("Password reset link sent!", "success");
      })
      .catch((err) =>
        console.log("Error while sending Password Reset link", err)
      );
  } catch (error: any) {
    if (error.message === "Email is required") {
      await updateToast("Email is required.", "failed");
    } else if (error.message === "Invalid email address") {
      await updateToast("Email is not valid.", "failed");
    }
    console.log("Error from Validation:", { error });
  }
};

const addFeedback = async (name: string, email: string, msg: string) => {
  await addDoc(feedbackRef, { name, email, msg })
    .then(async () => await updateToast("Thanks for your feedback.", "success"))
    .catch((err) =>
      console.log("Error while adding Feedback in Firestore", err)
    );
};

const handleDelMsg = async (chatId: string, msgId: string) => {
  const chatRef = doc(chatsRef, chatId);
  const msgRef = doc(chatRef, "messages", msgId);
  await deleteDoc(msgRef)
    .then(
      async () => await updateToast("Message  deleted successfully.", "success")
    )
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
    .then(async () => {
      console.log("Document added successfully!");
      handleMsgSent();
    })
    .catch((err) => console.error("Error while adding document:", err));
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
    .then(async () => {
      console.log("Document added successfully!");
      handleMsgSent();
    })
    .catch((err) => console.error("Error while adding document:", err));
};

const deleteFile = async (fileName: string) => {
  const fileRef = ref(storage, `${process.env.BUCKET}/files/${fileName}`);

  await deleteObject(fileRef)
    .then((res) => {
      console.log(res);
      console.log("File Deleted Successfully!");
    })
    .catch((err) => console.log("Error while deleting file:", err));
};

const downloadFile = (fileInfo: any) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var blob = xhr.response;
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = fileInfo.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        await updateToast("File downloaded successfully.", "success");
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

const handleStartChat = async (chatName: string, setIsLoading: any) => {
  let flag;
  setIsLoading(true);

  await getDocs(chatsRef).then((snapshot) =>
    snapshot.docs.forEach(async (chat) => {
      if (chat.data().chatName.includes(chatName)) {
        alert("Chat with the same name exists!");
        flag = false;
      } else {
        flag = true;
      }
    })
  );

  if (flag) {
    const chatDoc = doc(chatsRef, generateRandomString(20));
    await setDoc(chatDoc, {
      chatName,
      createdAt: serverTimestamp(),
    })
      .then(async () => {
        console.log("Created Chat");
        await updateToast("Chat created successfully.", "success");
      })
      .catch((err) => console.log("Error while creating chat", err));
  }

  setIsLoading(false);
};

const handleDelChat = (chatId: string) => {
  console.log("Deleting Chat...");
  const chatRef = doc(chatsRef, chatId);
  deleteDoc(chatRef)
    .then(async () => {
      console.log("Chat Deleted Successfully!");
      await updateToast("Chat deleted successfully.", "success");
    })
    .catch((err) => console.log("Error while deleting Chat", err));
};

const updateChatName = async (newName: string, chatId: string) => {
  const chatDoc = doc(chatsRef, chatId);
  await updateDoc(chatDoc, { chatName: newName })
    .then(async () => {
      console.log("Chat name updated successfully!");
      await updateToast("Chat renamed successfully.", "success");
    })
    .catch((error) => {
      console.error("Error updating chat name: ", error);
    });
};

const makeToastEmpty = async () => {
  await updateToast("", "");
};

const updateToast = async (msg: string, variant: string) => {
  await updateDoc(toastDoc, { text: msg, variant })
    .then(() => console.log("Toast Updated!"))
    .catch((err) => console.log("Error while updating toast", err));

  setTimeout(() => {
    makeToastEmpty();
  }, 3000);
};

const handleMsgSent = async () => {
  await updateToast("Message sent successfully.", "success");
};

const handleSigninSucess = async () => {
  await updateToast("Signed in successfully.", "success");
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
  handleStartChat,
  handleDelChat,
  updateChatName,
  makeToastEmpty,
};
