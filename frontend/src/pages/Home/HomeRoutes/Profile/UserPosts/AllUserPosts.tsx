import PostCard from "../../../../../components/PostCard";
import Loader from "../../../../../components/ui/Loader";
import { useAppSelector } from "../../../../../reduxHooks";
import { useGetAllUserPostsQuery } from "../../../../../services/appApi";
import { useParams } from "react-router-dom";

export default function AllUserPosts() {
  const { username } = useParams();

  //Access current user info
  const token = useAppSelector((state) => state.auth.token);

  //Handle the get user posts request
  const { data: allUserPostsData, isSuccess } = useGetAllUserPostsQuery({
    username,
    token,
  });

  return (
    <div>
      <ul className="grid">
        {allUserPostsData ? (
          allUserPostsData.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
        ) : (
          <Loader />
        )}
      </ul>
      {isSuccess && !allUserPostsData.length && (
        <p className="text-center mt-5 text-lg">No Posts yet</p>
      )}
    </div>
  );
}
