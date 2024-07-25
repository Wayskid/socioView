import { useParams } from "react-router-dom";
import Loader from "../../../../../components/ui/Loader";
import { useGetFollowingQuery } from "../../../../../services/appApi";
import { useAppSelector } from "../../../../../reduxHooks";
import FollowCard from "../../../../../components/FollowCard";

export default function Following() {
  const { username } = useParams();

  //Get current user info
  const token = useAppSelector((state) => state.auth.token);

  //Get user following
  const { data: followingData } = useGetFollowingQuery({
    username,
    token,
  });

  return (
    <ul className="grid p-3 items-center rounded-lg h-full content-start">
      {followingData ? (
        followingData.map((user) => (
          <FollowCard
            key={user._id.toString()}
            user={user}
            showMutualFollow={true}
          />
        ))
      ) : (
        <Loader />
      )}
    </ul>
  );
}
