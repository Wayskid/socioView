import { BiHomeSmile, BiSearch, BiBookmark, BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { useAppSelector } from "../../../reduxHooks";
import AppButton from "../../../components/ui/AppButton";

export default function LeftSidebar() {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  function pathMatch(route: String): boolean {
    if (route === location.pathname) {
      return true;
    }

    return false;
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className="w-64 hidden md:grid content-start gap-5">
      <div
        className={`grid px-4 py-10 gap-10 rounded-t-lg ${
          darkMode ? "bg-[#1d2226]" : "bg-white"
        }`}
      >
        <Link
          to={`profile/${currentUser.username}`}
          className="grid justify-items-center gap-4 py-4 justify-self-center"
        >
          <img
            src={currentUser?.profilePic}
            alt=""
            className="w-14 rounded-md h-14 object-cover"
          />
          <p className="text-sm text-center">{currentUser?.bio}</p>
        </Link>
        <div className="grid gap-6 justify-self-start">
          <Link
            to="/"
            className={`sidebarNavigation flex items-center gap-3 ${
              pathMatch("/") && "text-[#0caa49]"
            }`}
          >
            <BiHomeSmile />
            <p>Home</p>
          </Link>
          <Link
            to="Search"
            className={`sidebarNavigation flex items-center gap-3 ${
              pathMatch("/Search") && "text-[#0caa49]"
            }`}
          >
            <BiSearch />
            <p>Search</p>
          </Link>
          <Link
            to="bookmarks"
            className={`sidebarNavigation flex items-center gap-3 ${
              pathMatch("/bookmarks") && "text-[#0caa49]"
            }`}
          >
            <BiBookmark />
            <p>Bookmarks</p>
          </Link>
          <Link
            to={`profile/${currentUser.username}`}
            className={`sidebarNavigation flex items-center gap-3 ${
              pathMatch(`/profile/${currentUser.username}`) && "text-[#0caa49]"
            }`}
          >
            <BiUser />
            <p>Profile</p>
          </Link>
          <Link
            to="settings/account"
            className={`sidebarNavigation flex items-center gap-3 ${
              pathMatch("/settings/account") && "text-[#0caa49]"
            }`}
          >
            <FiSettings />
            <p>Settings</p>
          </Link>
        </div>
      </div>
      <div className="sticky top-20">
        <AppButton label="Say something" width="w-full" height="14" />
      </div>
    </div>
  );
}
