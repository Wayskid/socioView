import logoIcon from "../../assets/img/socioview.png";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import { useState, FormEvent, useContext } from "react";
import { useUsernameSettingMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useAppSelector } from "../../reduxHooks";
import { BsPerson } from "react-icons/bs";
import AppButton from "../../components/ui/AppButton";

export default function ChooseUsername() {
  //Get current User info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  //Save input to state
  const [newUsername, setNewUsername] = useState("");

  //Choose Username
  const [
    setUsername,
    { isLoading: settingUsername, error: chooseUsernameError },
  ] = useUsernameSettingMutation();

  //Error
  const [chooseUsernameErrorMsg, setChooseUsernameErrorMsg] = useState("");

  //Handle Choose Username
  function handleSetUsername(e: FormEvent) {
    e.preventDefault();

    setUsername({
      token,
      userId: currentUser._id,
      newUsername,
    })
      .unwrap()
      .then((result) => {
        setCurrentUser(result);
        navigate("/avatar");
      })
      .catch((err) => setChooseUsernameErrorMsg(err.data));
  }
  return (
    <div className="grid justify-items-center content-center text-slate-200 gap-12 w-[min(24rem,90%)] justify-self-center">
      <Link to="/" className="logo flex items-center gap-5">
        <img src={logoIcon} alt="" className="w-10" />
        <p className="text-3xl">SOCIOVIEW</p>
      </Link>
      <div className="bg-slate-800 rounded-lg py-10 px-5 grid gap-10 w-full relative">
        <div className="grid gap-2 text-center">
          <p className="text-xl ">Set Username</p>
          <p className="text-xs font-thin">
            Choose username or skip to let us choose for you
          </p>
        </div>
        <form className="grid gap-5" onSubmit={handleSetUsername}>
          <FormInput
            Icon={<BsPerson />}
            theme={false}
            id="setUsername"
            name="setUsername"
            type="text"
            placeholder="Choose username"
            handleChange={(e) => setNewUsername(e.target.value.trim())}
            value={newUsername}
          />
          {chooseUsernameError && (
            <p className="text-red-400 text-sm text-center">
              {chooseUsernameErrorMsg}
            </p>
          )}
          <AppButton
            label="Next"
            height="10"
            isLoading={settingUsername}
            isDisabled={newUsername && settingUsername === false ? false : true}
          />
          <AppButton
            label="Skip"
            regular={true}
            handleClick={() => navigate("/avatar")}
          />
        </form>
      </div>
    </div>
  );
}
