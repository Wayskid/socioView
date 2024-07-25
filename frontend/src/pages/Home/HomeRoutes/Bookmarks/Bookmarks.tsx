import { useContext } from "react";
import PostCard from "../../../../components/PostCard";
import AuthContext from "../../../../context/AuthContext";
import { useGetUserBookmarksQuery } from "../../../../services/appApi";
import { useAppSelector } from "../../../../reduxHooks";
import Loader from "../../../../components/ui/Loader";

export default function Bookmarks() {
  //Access current user info
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Handle get user bookmarks
  const { data: userBookmarksResult, isLoading: gettingBookmarks } =
    useGetUserBookmarksQuery({
      token,
      userId: currentUser._id,
    });

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid  md:rounded-lg h-full ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <div className="grid content-start p-3">
        <p className="text-2xl font-medium mb-3">Bookmarks</p>
        <ul className="grid md:gap-5 content-start">
          {userBookmarksResult ? (
            userBookmarksResult.map((bookmark) => (
              <PostCard key={bookmark._id} post={bookmark} />
            ))
          ) : (
            <Loader />
          )}

          {!gettingBookmarks && userBookmarksResult?.length === 0 && (
            <p className="text-center text-slate-500">No bookmarks yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}
