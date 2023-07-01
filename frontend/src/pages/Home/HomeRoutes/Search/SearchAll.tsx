import { useSearchVal } from "./Search";
import FollowCard from "../../../../components/FollowCard";
import Loader from "../../../../components/ui/Loader";
import PostCard from "../../../../components/PostCard";
import { Link } from "react-router-dom";

export default function SearchAll() {
  const {
    searchedUserData,
    searchingUsers,
    searchedPostsData,
    searchingPosts,
  } = useSearchVal();

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
                <Link to="people" className="text-[#0caa49]">
                  Show more
                </Link>
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
                <Link to="posts" className="text-[#0caa49]">
                  Show more
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
