import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../reduxHooks";

export default function Follows() {
  const location = useLocation();
  const { username } = useParams();

  function matchRoute(route: String) {
    if (route === location.pathname) {
      return true;
    }
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid md:rounded-lg h-full ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <div className="profile grid md:gap-4 content-start pt-5 px-3">
        <div className="flex justify-around justify-items-center border-b-slate-500 border-b">
          <Link
            to={`profile/${username}/followers`}
            className={`py-2 border-b-4 transition-[border] ${
              matchRoute(`/profile/${username}/followers`)
                ? "text-[#0caa49] border-[#0caa49]"
                : "border-transparent"
            } `}
          >
            Followers
          </Link>
          <Link
            to={`profile/${username}/following`}
            className={`py-2 border-b-4 transition-[border] ${
              matchRoute(`/profile/${username}/following`)
                ? "text-[#0caa49] border-[#0caa49]"
                : "border-transparent"
            } `}
          >
            Following
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
