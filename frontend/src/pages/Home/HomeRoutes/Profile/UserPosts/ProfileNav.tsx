import { Link, Outlet, useParams, useLocation } from "react-router-dom";

export default function ProfileNav() {
  const location = useLocation();
  const { username } = useParams();

  function matchRoute(route: String) {
    if (route === location.pathname) {
      return true;
    }
  }
  
  return (
    <div className="profileNav rounded-lg grid gap-3 mt-4">
      <div className="flex justify-around justify-items-center border-b-slate-500 border-b">
        <Link
          to={"."}
          className={`py-2 border-b-4 transition-[border] ${
            matchRoute(`/profile/${username}`)
              ? "text-[#0caa49] border-[#0caa49]"
              : "border-transparent"
          }`}
        >
          Posts
        </Link>
        <Link
          to={"posts_liked"}
          className={`py-2 border-b-4 transition-[border] ${
            matchRoute(`/profile/${username}/posts_liked`)
              ? "text-[#0caa49] border-[#0caa49]"
              : "border-transparent"
          }`}
        >
          Likes
        </Link>
        <Link
          to={"posts_media"}
          className={`py-2 border-b-4 transition-[border] ${
            matchRoute(`/profile/${username}/posts_media`)
              ? "text-[#0caa49] border-[#0caa49]"
              : "border-transparent"
          }`}
        >
          Media
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
