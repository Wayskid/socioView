import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/img/socioview.png";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useRegisterUserMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch } from "../../reduxHooks";
import { setToken, setIsReg } from "../../store/features/authSlice";
import FormInput from "../../components/form/FormInput";
import AppButton from "../../components/ui/AppButton";

export default function Register() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  //Input state
  const [registerDetails, setRegisterDetails] = useState<RegDetTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Register Form Array
  const regFormArray = [
    {
      Icon: <MdPerson />,
      id: "name",
      type: "text",
      name: "name",
      placeholder: "Enter Name",
      required: true,
      errMsg: "Name should be 2 chars minimum. Special chars are not allowed",
      pattern: "^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$",
    },
    {
      Icon: <MdEmail />,
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Enter Email",
      required: true,
      errMsg: "Please provide a valid email",
    },
    {
      Icon: <MdLock />,
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
      errMsg: "Please provide a password",
    },
    {
      Icon: <MdLock />,
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      required: true,
      errMsg: "Passwords don't match",
      pattern: registerDetails.password,
    },
  ];

  //Save Login inputs to state
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value.trim(),
    });
  }

  //Register user
  const [registerUser, { isLoading: registering, error: registerError }] =
    useRegisterUserMutation();

  //Error
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  //Handle register user
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (
      registerDetails.name &&
      registerDetails.email &&
      registerDetails.password &&
      registerDetails.confirmPassword
    ) {
      registerUser(registerDetails)
        .unwrap()
        .then((result) => {
          setCurrentUser(result);
          dispatch(setToken(result.token));
          dispatch(setIsReg(true));
          navigate("/chooseUsername");
        })
        .catch((err) => setRegisterErrorMsg(err.data));
    }
  }

  return (
    <div className="grid justify-items-center content-center text-slate-200 gap-8 w-[min(28rem,90%)] justify-self-center py-8">
      <Link to="/" className="logo flex items-center gap-5">
        <img src={logoIcon} alt="" className="w-10" />
        <p className="text-3xl">SOCIOVIEW</p>
      </Link>
      <div className="bg-slate-800 rounded-lg p-7 grid gap-10 w-full relative">
        <div className="grid gap-2 text-center">
          <p className="text-xl ">Create an Account</p>
          <p className="text-xs font-thin">
            Please fill in the following details to create an account
          </p>
        </div>
        <form
          className="grid gap-5 [&>*:nth-child(5)_.formIcon]:top-[0.85rem]"
          onSubmit={handleRegister}
        >
          {regFormArray.map((input) => (
            <FormInput
              theme={false}
              key={input.id}
              {...input}
              handleChange={handleInputChange}
              value={
                registerDetails[input.name as keyof typeof registerDetails]
              }
            />
          ))}
          {registerError && (
            <p className="text-red-400 text-sm text-center">
              {registerErrorMsg}
            </p>
          )}
          <AppButton
            label="Create Account"
            height="10"
            isLoading={registering}
            isDisabled={
              registerDetails.email &&
              registerDetails.name &&
              registerDetails.password &&
              registerDetails.confirmPassword &&
              registering === false
                ? false
                : true
            }
          />
        </form>
      </div>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <AppButton
          label="Login"
          regular={true}
          handleClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
}
