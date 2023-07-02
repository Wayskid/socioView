import { ChangeEvent, FormEvent, useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
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

export default function Settings() {
  //Get current User info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Save input to state
  const [settingsVal, setSettingsVal] = useState({
    newUsername: currentUser.username,
    newEmail: currentUser.email,
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSettingsVal({ ...settingsVal, [e.target.name]: e.target.value });
  }

  //Handle Change Username
  const [changeUsernameError, setChangeUsernameError] = useState("");
  const [changeUsername, { isLoading: changingUsername }] =
    useUsernameSettingMutation();

  function handleChangeUsername(e: FormEvent) {
    e.preventDefault();

    changeUsername({
      token,
      userId: currentUser._id,
      newUsername: settingsVal.newUsername,
    })
      .unwrap()
      .then((result) => {
        if (result === "Username already taken") {
          setChangeUsernameError(result);
        } else {
          setCurrentUser(result);
          setChangeUsernameError("");
        }
      });
  }

  //Handle Change Email
  const [changeEmailError, setChangeEmailError] = useState("");
  const [changeEmail, { isLoading: changingEmail }] = useEmailSettingMutation();

  function handleChangeEmail(e: FormEvent) {
    e.preventDefault();
    changeEmail({
      token,
      userId: currentUser._id,
      newEmail: settingsVal.newEmail,
    })
      .unwrap()
      .then((result) => {
        if (result === "Email already exists") {
          setChangeEmailError(result);
        } else {
          setCurrentUser(result);
          setChangeEmailError("");
        }
      });
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
          <Link to={`/`} className="text-[2xl] text-[#0caa49]">
            DONE
          </Link>
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
              />
              {settingsVal.newUsername !== currentUser.username && (
                <button className="text-[2xl] text-[#0caa49]">SAVE</button>
              )}
            </form>
            <p className="text-red-400 text-sm">
              {!changingUsername &&
                settingsVal.newUsername !== currentUser.username &&
                changeUsernameError}
            </p>
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
              />
              {settingsVal.newEmail !== currentUser.email && (
                <button className="text-[2xl] text-[#0caa49]">SAVE</button>
              )}
            </form>
            <p className="text-red-400 text-sm">
              {!changingEmail &&
                settingsVal.newEmail !== currentUser.email &&
                changeEmailError}
            </p>
          </div>
          <div className="grid gap-2 justify-self-end">
            <button
              className="text-sm text-[#0caa49] text-right"
              onClick={() => dispatch(setOpenCloseChangePassword())}
            >
              CHANGE PASSWORD
            </button>
            <Link
              to={`/settings/profile`}
              className="text-sm text-[#0caa49] text-right"
            >
              EDIT PROFILE
            </Link>
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
