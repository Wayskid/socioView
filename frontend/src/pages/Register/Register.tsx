import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/img/socioview.png";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useRegisterUserMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch } from "../../reduxHooks";
import { setToken, setIsReg } from "../../store/features/authSlice";
import Loader from "../../components/ui/Loader";
import FormInput from "../../components/form/FormInput";

export default function Register() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [registerDetails, setRegisterDetails] = useState<RegDetTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [imgUploadDet, { isLoading: loading }] =
  //   useUploadToCloudinaryMutation();
  const [registerUser, { isLoading: Registering, isError }] =
    useRegisterUserMutation();

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
      pattern:
        "^([a-zA-Z0-9]+|[a-zA-Z0-9]+s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+s{1}[a-zA-Z0-9]{3,}s{1}[a-zA-Z0-9]{1,})$",
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
      [e.target.name]: e.target.value,
    });
  }

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
        });
    }
  }

  return (
    <div className="grid justify-items-center content-center text-slate-200 gap-8 w-[min(30rem,90%)] justify-self-center py-8 relative">
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
          className="regForm grid gap-5 [&>*:nth-child(5)_.formIcon]:top-[0.85rem]"
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
          <button className="socioViewBtns py-3">Create Account</button>
          {isError && (
            <p className="text-sm text-red-600 text-center absolute bottom-1 justify-self-center">
              Something went wrong
            </p>
          )}
        </form>
      </div>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="text-[#0caa49]">
          Login
        </Link>
      </div>
      {Registering && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
