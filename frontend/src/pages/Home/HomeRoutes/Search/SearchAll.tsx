import { useSearchVal } from "./Search";
import FollowCard from "../../../../components/FollowCard";
import Loader from "../../../../components/ui/Loader";
import PostCard from "../../../../components/PostCard";
import AppButton from "../../../../components/ui/AppButton";
import { useNavigate } from "react-router-dom";

export default function SearchAll() {
  //Outlet context
  const {
    searchedUserData,
    searchingUsers,
    searchedPostsData,
    searchingPosts,
    searchVal,
  } = useSearchVal();

  const navigate = useNavigate();

  return (
    <div className="grid p-3 gap-6">
      {!searchingUsers || !searchingPosts ? (
        <>
          {searchedUserData?.length > 0 && (
            <div>
              {searchedUserData?.length > 0 && (
                <p className="text-2xl font-medium">People</p>
              )}
              <div className="grid">
                {searchedUserData?.slice(0, 4).map((user) => (
                  <FollowCard
                    key={user._id.toString()}
                    user={user}
                    showMutualFollow={true}
                  />
                ))}
              </div>
              {searchedUserData?.length > 4 && (
                <AppButton
                  label="Show more"
                  regular={true}
                  handleClick={() => navigate("/Search/people")}
                />
              )}
            </div>
          )}
          {searchedPostsData?.length > 0 && (
            <div>
              {searchedPostsData?.length > 0 && (
                <p className="text-2xl font-medium">Posts</p>
              )}
              <div className="grid">
                {searchedPostsData?.slice(0, 4).map((post) => (
                  <PostCard key={post._id.toString()} post={post} />
                ))}
              </div>
              {searchedPostsData?.length > 4 && (
                <AppButton
                  label="Show more"
                  regular={true}
                  handleClick={() => navigate("/Search/posts")}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
      {searchedUserData &&
        searchedPostsData &&
        searchedUserData.length === 0 &&
        searchedPostsData.length === 0 && (
          <p className="text-center text-slate-500 mt-3">
            Cannot find "{searchVal}"
          </p>
        )}
    </div>
  );
}
