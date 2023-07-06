import { IoIosArrowDropdownCircle } from "react-icons/io";
import logoIcon from "../../../assets/img/socioview.png";
import NavProfileMenu from "./NavProfileMenu";
import { useState, useContext, Dispatch } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../reduxHooks";

export default function HomeNavbar({
  setMobileMenu,
  mobileMenu,
}: {
  setMobileMenu: Dispatch<React.SetStateAction<boolean>>;
  mobileMenu: Boolean;
}) {
  const { currentUser } = useContext(AuthContext);
  const [navProfileMenuShown, setNavProfileMenuShown] = useState(false);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`homeNavbar flex right-0  justify-center items-center w-full p-3 z-50 fixed ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <div className="navMain flex w-[min(73rem,100%)] justify-between items-center">
        <div
          className="burger grid md:hidden gap-[0.35rem] cursor-pointer"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className="w-7 h-[0.2rem] bg-[#0caa49]"></div>
          <div className="w-5 h-[0.2rem] bg-[#0caa49]"></div>
          <div className="w-3 h-[0.2rem] bg-[#0caa49]"></div>
        </div>
        <button className="logo flex items-center gap-5">
          <a href="#feed">
            <img src={logoIcon} alt="Logo" className="w-8" />
          </a>
          <Link to="/" className="text-xl hidden md:grid">
            SOCIOVIEW
          </Link>
        </button>
        <div className="hidden md:flex gap-3 items-center relative">
          <p>{currentUser.name}</p>
          <button
            className="relative"
            onClick={() => setNavProfileMenuShown(!navProfileMenuShown)}
            id="navProfile"
          >
            <img
              src={currentUser.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-md object-cover"
            />
            <IoIosArrowDropdownCircle className="absolute -bottom-1 -right-1 text-[#0caa49]" />
          </button>

          <NavProfileMenu
            navProfileMenuShown={navProfileMenuShown}
            setNavProfileMenuShown={setNavProfileMenuShown}
          />
        </div>
      </div>
    </div>
  );
}
