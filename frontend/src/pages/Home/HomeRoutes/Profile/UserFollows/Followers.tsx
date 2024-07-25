import { useParams } from "react-router-dom";
import Loader from "../../../../../components/ui/Loader";
import { useAppSelector } from "../../../../../reduxHooks";
import { useGetFollowersQuery } from "../../../../../services/appApi";
import FollowCard from "../../../../../components/FollowCard";

export default function Following() {
  const { username } = useParams();

  //Get current user info
  const token = useAppSelector((state) => state.auth.token);

  //Get user followers
  const { data: followersData } = useGetFollowersQuery({
    username,
    token,
  });

  return (
    <ul className="grid p-3 items-center rounded-lg h-full content-start">
      {followersData ? (
        followersData.map((user) => (
          <FollowCard
            key={user._id.toString()}
            user={user}
            showMutualFollow={false}
          />
        ))
      ) : (
        <Loader />
      )}
    </ul>
  );
}
