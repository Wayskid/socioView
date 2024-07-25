import { useParams } from "react-router-dom";
import PostCard from "../../../../../components/PostCard";
import Loader from "../../../../../components/ui/Loader";
import { useAppSelector } from "../../../../../reduxHooks";
import { useGetPostsUserLikedQuery } from "../../../../../services/appApi";

export default function PostsUserLiked() {
  const { username } = useParams();

  //Access current user info
  const token = useAppSelector((state) => state.auth.token);

  //Handle the get user posts request
  const { data: likedUserPostsData, isSuccess } = useGetPostsUserLikedQuery({
    username,
    token,
  });

  return (
    <div>
      <ul className="grid">
        {likedUserPostsData ? (
          likedUserPostsData.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
        ) : (
            <Loader />
        )}
      </ul>
      {isSuccess && !likedUserPostsData.length && (
        <p className="text-center mt-5 text-lg">No Posts yet</p>
      )}
    </div>
  );
}
