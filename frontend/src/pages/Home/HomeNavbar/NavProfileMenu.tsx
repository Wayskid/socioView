import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { setToken } from "../../../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { Link } from "react-router-dom";
import { BiLogOut, BiMoon, BiSun, BiUser } from "react-icons/bi";
import { setDarkMode } from "../../../store/features/appSlice";

export default function NavProfileMenu({
  navProfileMenuShown,
  setNavProfileMenuShown,
}: {
  navProfileMenuShown: Boolean;
  setNavProfileMenuShown: Dispatch<SetStateAction<boolean>>;
}) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, visibility: "hidden", translateY: "-20px" },
        end: { opacity: 1, visibility: "visible", translateY: 0 },
      }}
      animate={!navProfileMenuShown ? "initial" : "end"}
      className={`navProfileMenu absolute w-40 right-0  rounded-md overflow-hidden border-slate-700 border top-[3rem] grid text-sm ${
        darkMode ? "bg-black" : "bg-slate-200"
      }`}
    >
      <Link
        to={`/profile/${currentUser.username}`}
        className={`py-3  ease-in border-b-[1px] border-slate-700 flex items-center justify-center gap-1 ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300"
        }`}
        onClick={() => {
          setNavProfileMenuShown(!navProfileMenuShown);
        }}
      >
        <BiUser />
        View Profile
      </Link>
      <button
        className={`py-3  ease-in border-b-[1px] border-slate-700 flex items-center justify-center gap-1 ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300"
        }`}
        onClick={() => {
          setNavProfileMenuShown(!navProfileMenuShown);
          dispatch(setDarkMode());
        }}
      >
        {darkMode ? (
          <>
            <BiSun />
            <p>Light Mode</p>
          </>
        ) : (
          <>
            <BiMoon />
            <p>Dark Mode</p>
          </>
        )}
      </button>
      <button
        className={`py-3  ease-in flex items-center justify-center gap-1 ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300"
        }`}
        onClick={() => {
          setCurrentUser({});
          dispatch(setToken(""));
          setNavProfileMenuShown(!navProfileMenuShown);
        }}
      >
        <BiLogOut />
        Log out
      </button>
    </motion.div>
  );
}
