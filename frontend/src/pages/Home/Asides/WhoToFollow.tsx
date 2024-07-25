import { useContext } from "react";
import { useWhoToFollowQuery } from "../../../services/appApi";
import AuthContext from "../../../context/AuthContext";
import { useAppSelector } from "../../../reduxHooks";
import FollowCard from "../../../components/FollowCard";
import Loader from "../../../components/ui/Loader";

export default function WhoToFollow() {
  //Access current user info
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Handle get who to follow
  const { data: whoToFollowResult } = useWhoToFollowQuery({
    token,
    userId: currentUser._id,
  });

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid  sticky top-20 mt-4 rounded-b-md pt-3 ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <p className="text-xl font-medium px-3">Who to Follow</p>
      <ul className="grid [&>*:last-child]:rounded-b-lg [&>*:last-child]:border-b-0">
        {whoToFollowResult ? (
          whoToFollowResult.map((user) => (
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
    </div>
  );
}
