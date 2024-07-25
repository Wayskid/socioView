import { ChangeEvent, useState, useContext, FormEvent } from "react";
import { MdLock } from "react-icons/md";
import FormInput from "../../../../components/form/FormInput";
import { BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import {
  setAlertMsg,
  setOpenCloseChangePassword,
  setShowAlert,
} from "../../../../store/features/appSlice";
import { useChangePasswordMutation } from "../../../../services/appApi";
import AuthContext from "../../../../context/AuthContext";
import Loader from "../../../../components/ui/Loader";
import AppButton from "../../../../components/ui/AppButton";

export default function ChangePassword() {
  const dispatch = useAppDispatch();

  //Current user info
  const token = useAppSelector((state) => state.auth.token);
  const { currentUser } = useContext(AuthContext);

  //Save inputs to state
  const [changePassDetails, setChangePassDetails] = useState({
    currentPassword: "",
    updatedPassword: "",
    confirmUpdatedPassword: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setChangePassDetails({
      ...changePassDetails,
      [e.target.name]: e.target.value,
    });
  }

  // Change password Form Array
  const changePasswordFormArray = [
    {
      Icon: <MdLock />,
      id: "old",
      type: "password",
      name: "currentPassword",
      placeholder: "Enter Current Password",
      required: true,
    },
    {
      Icon: <MdLock />,
      id: "new",
      type: "password",
      name: "updatedPassword",
      placeholder: "Password",
      required: true,
    },
    {
      Icon: <MdLock />,
      id: "confirm",
      type: "password",
      name: "confirmUpdatedPassword",
      placeholder: "Confirm Password",
      required: true,
      errMsg: "Passwords don't match",
      pattern: changePassDetails.updatedPassword,
    },
  ];

  //Handle change password
  const [
    changePassword,
    { isLoading: changingPassword, error: changePasswordError },
  ] = useChangePasswordMutation();

  //Error
  const [changePasswordErrorMsg, setChangePasswordErrorMsg] = useState("");

  function handleChangePassword(e: FormEvent) {
    e.preventDefault();

    changePassword({
      token,
      userId: currentUser._id,
      passwordData: {
        currentPassword: changePassDetails.currentPassword,
        newPassword: changePassDetails.updatedPassword,
      },
    })
      .unwrap()
      .then(() => {
        setChangePassDetails({
          currentPassword: "",
          updatedPassword: "",
          confirmUpdatedPassword: "",
        });
        dispatch(setOpenCloseChangePassword());
        dispatch(setAlertMsg("Password Changed"));
        dispatch(setShowAlert(true));
      })
      .catch((err) => setChangePasswordErrorMsg(err.data));
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className="fixed h-full w-full grid bg-[#121212fb] items-center justify-items-center z-50">
      <div
        className={`w-[min(25rem,90%)] grid rounded-lg relative p-6 ${
          darkMode ? "bg-[#1d2226] text-slate-200" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl ">Change Password</p>
          <button
            className="text-4xl text-[#0caa49] "
            onClick={() => dispatch(setOpenCloseChangePassword())}
          >
            <BiX />
          </button>
        </div>
        <form className="grid gap-3" onSubmit={handleChangePassword}>
          {changePasswordFormArray.map((input) => (
            <FormInput
              theme={true}
              key={input.id}
              {...input}
              value={
                changePassDetails[input.name as keyof typeof changePassDetails]
              }
              errMsg={input.errMsg}
              pattern={input.pattern}
              handleChange={handleInputChange}
            />
          ))}
          {changePasswordError && (
            <p className="text-red-400 text-sm">{changePasswordErrorMsg}</p>
          )}
          <AppButton
            label="Update Password"
            height="10"
            isLoading={changingPassword}
            isDisabled={
              changePassDetails.currentPassword &&
              changePassDetails.updatedPassword &&
              changePassDetails.confirmUpdatedPassword
                ? false
                : true
            }
          />
        </form>
      </div>
      {changingPassword && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
