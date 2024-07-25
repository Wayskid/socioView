import React, { Dispatch, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import {
  BiHomeSmile,
  BiSearch,
  BiBookmark,
  BiUser,
  BiLogOut,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { setToken } from "../../../store/features/authSlice";
import { setDarkMode } from "../../../store/features/appSlice";

export default function MobileMenu({
  setIsMenuShown,
  isMenuShown,
}: {
  setIsMenuShown: Dispatch<React.SetStateAction<boolean>>;
  isMenuShown: Boolean;
}) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function pathMatch(route: String): boolean {
    if (route === location.pathname) {
      return true;
    }

    return false;
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      data-testid="mobileMenuDiv"
      className={`md:hidden w-[70%] h-full  p-5 grid gap-12 content-start ease-in-out fixed -translate-x-[100%] transition-[transform] ${
        isMenuShown && "translate-x-0"
      } ${darkMode ? "bg-[#1d2226]" : "bg-white"}`}
    >
      <div className="grid gap-2" onClick={() => setIsMenuShown(!isMenuShown)}>
        <img
          src={currentUser?.profilePic}
          alt=""
          className="w-14 rounded-sm h-14 object-cover cursor-pointer"
          onClick={() => navigate(`/profile/${currentUser?.username}`)}
        />
        <div className="grid">
          <p className="text-lg">{currentUser?.name}</p>
          <p className="leading-[0.6] text-sm text-slate-500">
            @{currentUser?.username}
          </p>
        </div>
        <div className="flex gap-4 text-lg">
          <button
            className="flex items-center gap-1"
            onClick={() =>
              navigate(`/profile/${currentUser?.username}/followers`)
            }
          >
            {currentUser?.followers.length}
            <span className="text-sm text-slate-500">
              Follower{currentUser && currentUser.followers.length > 1 && "s"}
            </span>
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() =>
              navigate(`/profile/${currentUser?.username}/following`)
            }
          >
            {currentUser && currentUser.following.length}
            <span className="text-sm text-slate-500">Following</span>
          </button>
        </div>
      </div>
      <div className="grid justify-start gap-6">
        <Link
          to="/"
          onClick={() => setIsMenuShown(!isMenuShown)}
          className={`sidebarNavigation flex items-center text-xl font-medium gap-3 ${
            pathMatch("/") && "text-[#0caa49]"
          }`}
        >
          <BiHomeSmile />
          <p>Home</p>
        </Link>
        <Link
          to="Search"
          onClick={() => setIsMenuShown(!isMenuShown)}
          className={`sidebarNavigation flex items-center text-xl font-medium gap-3 ${
            pathMatch("/Search") && "text-[#0caa49]"
          }`}
        >
          <BiSearch />
          <p>Search</p>
        </Link>
        <Link
          to="bookmarks"
          onClick={() => setIsMenuShown(!isMenuShown)}
          className={`sidebarNavigation flex items-center text-xl font-medium gap-3 ${
            pathMatch("/bookmarks") && "text-[#0caa49]"
          }`}
        >
          <BiBookmark />
          <p>Bookmarks</p>
        </Link>
        <Link
          to={`profile/${currentUser?.username}`}
          onClick={() => setIsMenuShown(!isMenuShown)}
          className={`sidebarNavigation flex items-center text-xl font-medium gap-3 ${
            pathMatch(`/profile/${currentUser?.username}`) && "text-[#0caa49]"
          }`}
        >
          <BiUser />
          <p>Profile</p>
        </Link>
        <Link
          to="settings/account"
          onClick={() => setIsMenuShown(!isMenuShown)}
          className={`sidebarNavigation flex items-center text-xl font-medium gap-3 ${
            pathMatch("/settings/account") && "text-[#0caa49]"
          }`}
        >
          <FiSettings />
          <p>Settings</p>
        </Link>
      </div>

      <div className="grid gap-1 justify-start font-medium text-lg">
        <button
          className="hover:bg-slate-700 flex items-center gap-3 hover:bg-transparent"
          onClick={() => {
            setIsMenuShown(!isMenuShown);
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
          className="hover:bg-slate-700 flex items-center gap-3 hover:bg-transparent"
          onClick={() => {
            setIsMenuShown(!isMenuShown);
            setCurrentUser({});
            dispatch(setToken(""));
          }}
        >
          <BiLogOut />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}
