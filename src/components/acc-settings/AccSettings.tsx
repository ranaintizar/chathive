import React, { useEffect } from "react";
import clsx from "clsx";

import { handleSignOut, handleDelAcc } from "src/lib/firebaseFunctions";
import Field from "components/field";
import AlertBox from "components/alert-box";
import Spinner from "components/spinner";

import stl from "./AccSettings.module.scss";

interface Props {
  theme: string;
  setIsVerified: (arg: Boolean) => void;
}

const AccSettings = ({ theme, setIsVerified }: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [alertData, setAlertData] = React.useState({
    title: "Logout",
    msg: "Are you sure you want to logout?",
    titleColor: "coral",
    btnLabel: "Yes, Logout",
    customClass: stl.logout,
    okClick: () => {
      setIsVisible(false);
      handleSignOut();
    },
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return isLoading ? (
    <Spinner spinnerColor="#1e90ff" />
  ) : (
    <div
      className={clsx(
        stl.accSettings,
        theme === "dark" ? stl.darkAccSetting : undefined
      )}
    >
      <div className={stl.row}>
        <Field
          theme={theme}
          title="Password"
          name="password"
          setIsVerified={setIsVerified}
          content="*******"
          btnLabel="Change"
        />
      </div>
      <div className={stl.row}>
        <div className={stl.field}>
          <span className={stl.label}>Logout</span>
          <span className={stl.title}>Logout your Account?</span>
          <div
            className={stl.btnContainer}
            onClick={() => {
              setAlertData({
                title: "Logout",
                msg: "Are you sure you want to logout?",
                titleColor: "coral",
                btnLabel: "Yes, Logout",
                customClass: stl.logout,
                okClick: () => {
                  setIsVisible(false);
                  handleSignOut();
                },
              });
              setIsVisible(true);
            }}
          >
            <button className={stl.logoutBtn}>Logout</button>
          </div>
        </div>
      </div>
      <div className={stl.row}>
        <div className={stl.field}>
          <span className={stl.label}>Delete</span>
          <span className={stl.title}>Delete your Account?</span>
          <div className={stl.btnContainer}>
            <button
              className={stl.delBtn}
              onClick={() => {
                setAlertData({
                  title: "Delete",
                  msg: "Are you sure you want to Delete your Account?",
                  titleColor: "red",
                  btnLabel: "Yes, Delete",
                  customClass: stl.delete,
                  okClick: () => {
                    setIsVisible(false);
                    handleDelAcc();
                  },
                });
                setIsVisible(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <AlertBox
        theme={theme}
        title={alertData.title}
        titleColor={alertData.titleColor}
        msg={alertData.msg}
        btnLabel={alertData.btnLabel}
        visible={isVisible}
        cancelBtn={true}
        btnCustomClass={alertData.customClass}
        handleOnClick={alertData.okClick}
        handleCancel={() => setIsVisible(false)}
      />
    </div>
  );
};

export default AccSettings;
