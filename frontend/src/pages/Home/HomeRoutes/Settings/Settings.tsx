import { ChangeEvent, FormEvent, useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useUsernameSettingMutation,
  useEmailSettingMutation,
} from "../../../../services/appApi";
import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import Loader from "../../../../components/ui/Loader";
import FormInput from "../../../../components/form/FormInput";
import { BiUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { setOpenCloseChangePassword } from "../../../../store/features/appSlice";
import AppButton from "../../../../components/ui/AppButton";

export default function Settings() {
  const navigate = useNavigate();

  //Get current User info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Save input to state
  const [settingsVal, setSettingsVal] = useState({
    newUsername: currentUser.username,
    newEmail: currentUser.email,
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSettingsVal({ ...settingsVal, [e.target.name]: e.target.value.trim() });
  }

  //Change Username
  const [
    changeUsername,
    { isLoading: changingUsername, error: changeUsernameError },
  ] = useUsernameSettingMutation();

  //Error
  const [changeUsernameErrorMsg, setChangeUsernameErrorMsg] = useState("");

  //Handle Change Username
  function handleChangeUsername(e: FormEvent) {
    e.preventDefault();

    changeUsername({
      token,
      userId: currentUser._id,
      newUsername: settingsVal.newUsername,
    })
      .unwrap()
      .then((result) => setCurrentUser(result))
      .catch((error) => setChangeUsernameErrorMsg(error.data));
  }

  //Change Email
  const [changeEmail, { isLoading: changingEmail, error: changeEmailError }] =
    useEmailSettingMutation();

  //Error
  const [changeEmailErrorMsg, setChangeEmailErrorMsg] = useState("");

  //Handle Change Email
  function handleChangeEmail(e: FormEvent) {
    e.preventDefault();
    changeEmail({
      token,
      userId: currentUser._id,
      newEmail: settingsVal.newEmail,
    })
      .unwrap()
      .then((result) => setCurrentUser(result))
      .catch((error) => setChangeEmailErrorMsg(error.data));
  }

  //Show change password
  const dispatch = useAppDispatch();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid relative md:rounded-lg h-full ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <div className="profile grid content-start p-3 gap-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium">Settings</p>
          <AppButton
            label="Done"
            regular={true}
            handleClick={() => navigate("/")}
          />
        </div>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <p>Username</p>
            <form
              className="grid grid-flow-col gap-3"
              onSubmit={handleChangeUsername}
            >
              <FormInput
                theme={true}
                Icon={<BiUserCircle />}
                type="text"
                id="newUsername"
                name="newUsername"
                value={settingsVal.newUsername.toString()}
                handleChange={handleInputChange}
                pattern="^[A-Za-z0-9]{3,50}$"
                required={true}
              />
              {settingsVal.newUsername !== currentUser.username && (
                <AppButton
                  regular={true}
                  label="Save"
                  isLoading={changingUsername}
                />
              )}
            </form>
            {changeUsernameError && (
              <p className="text-red-400 text-sm">{changeUsernameErrorMsg}</p>
            )}
          </div>
          <div className="grid gap-1">
            <p>Email</p>
            <form
              className="grid grid-flow-col gap-3"
              onSubmit={handleChangeEmail}
            >
              <FormInput
                theme={true}
                Icon={<MdEmail />}
                type="email"
                name="newEmail"
                id="newEmail"
                value={settingsVal.newEmail.toString()}
                handleChange={handleInputChange}
                required={true}
              />
              {settingsVal.newEmail !== currentUser.email && (
                <AppButton
                  regular={true}
                  label="Save"
                  isLoading={changingEmail}
                />
              )}
            </form>
            {changeEmailError && (
              <p className="text-red-400 text-sm">{changeEmailErrorMsg}</p>
            )}
          </div>
          <div className="grid gap-2 justify-self-end [&>:last-child]:text-right">
            <AppButton
              label="Change password"
              regular={true}
              handleClick={() => dispatch(setOpenCloseChangePassword())}
            />
            <AppButton
              label="Edit profile"
              regular={true}
              handleClick={() => navigate("/settings/profile")}
            />
          </div>
        </div>
      </div>
      {changingUsername && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
      {changingEmail && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
