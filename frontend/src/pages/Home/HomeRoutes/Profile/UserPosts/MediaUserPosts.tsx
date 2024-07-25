import { useParams } from "react-router-dom";
import PostCard from "../../../../../components/PostCard";
import Loader from "../../../../../components/ui/Loader";
import { useAppSelector } from "../../../../../reduxHooks";
import { useGetMediaUserPostsQuery } from "../../../../../services/appApi";

export default function MediaUserPosts() {
  const { username } = useParams();

  //Access current user info
  const token = useAppSelector((state) => state.auth.token);

  //Handle the get user posts request
  const { data: mediaUserPostsData, isSuccess } = useGetMediaUserPostsQuery({
    username,
    token,
  });

  return (
    <div>
      <div className="grid">
        {mediaUserPostsData ? (
          mediaUserPostsData.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
        ) : (
          <Loader />
        )}
      </div>
      {isSuccess && !mediaUserPostsData.length && (
        <p className="text-center mt-5 text-lg">No Posts yet</p>
      )}
    </div>
  );
}
