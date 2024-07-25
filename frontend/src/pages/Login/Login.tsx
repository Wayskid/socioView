import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/img/socioview.png";
import { MdEmail, MdLock } from "react-icons/md";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useLoginMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch } from "../../reduxHooks";
import { setIsReg, setToken } from "../../store/features/authSlice";
import FormInput from "../../components/form/FormInput";
import AppButton from "../../components/ui/AppButton";

export default function Login() {
  const navigate = useNavigate();

  //Set user info
  const { setCurrentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  // Register Form Array
  const loginFormArray = [
    {
      Icon: <MdEmail />,
      id: "emailOrUsername",
      type: "text",
      name: "emailOrUsername",
      placeholder: "Enter Email or Username",
      required: true,
    },
    {
      Icon: <MdLock />,
      id: "email",
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      required: true,
    },
  ];

  //Save Login inputs to state
  const [loginDetails, setLoginDetails] = useState({
    emailOrUsername: "",
    password: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value.trim(),
    });
  }

  //login
  const [login, { isLoading: loggingIn, error: loginError }] =
    useLoginMutation();

  //Error
  const [loginErrorMsg, setloginErrorMsg] = useState("");

  //Handle login
  function handleLogin(e: FormEvent) {
    e.preventDefault();
    login(loginDetails)
      .unwrap()
      .then((fulfilled) => {
        setCurrentUser(fulfilled);
        dispatch(setToken(fulfilled.token));
        dispatch(setIsReg(false));
        navigate("/");
      })
      .catch((err) => setloginErrorMsg(err.data));
  }

  return (
    <div className="grid justify-items-center content-center text-slate-200 gap-8 w-[min(28rem,90%)] justify-self-center py-8">
      <Link to="/" className="logo flex items-center gap-5">
        <img src={logoIcon} alt="" className="w-10" />
        <p className="text-3xl">SOCIOVIEW</p>
      </Link>
      <div className="bg-slate-800 rounded-lg p-7 grid gap-10 w-full relative">
        <div className="grid gap-2 text-center">
          <p className="text-xl ">Welcome Back</p>
          <p className="text-xs font-thin">
            Please enter your login details to access your account
          </p>
        </div>
        <form className="grid gap-5" onSubmit={handleLogin}>
          {loginFormArray.map((input) => (
            <FormInput
              theme={false}
              key={input.id}
              {...input}
              handleChange={handleInputChange}
              value={loginDetails[input.name as keyof typeof loginDetails]}
            />
          ))}
          {loginError && (
            <p className="text-red-400 text-sm text-center">{loginErrorMsg}</p>
          )}
          <AppButton
            label="Login"
            height="10"
            isLoading={loggingIn}
            isDisabled={
              loginDetails.emailOrUsername &&
              loginDetails.password &&
              loggingIn === false
                ? false
                : true
            }
          />
        </form>
      </div>
      <div className="flex gap-2">
        <p>Don't have an account?</p>
        <AppButton
          label="Create an account"
          regular={true}
          handleClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}
