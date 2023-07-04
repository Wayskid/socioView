import { BiWorld } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useUpdateFollowMutation } from "../../../../services/appApi";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import {
  setImageToShow,
  setShowImage,
} from "../../../../store/features/appSlice";

export default function ProfileSummary({
  profileOwner,
}: {
  profileOwner: UserInfoType;
}) {
  const { username } = useParams();

  //Get current user info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Handle Follow and Unfollow requests
  const [updateFollow] = useUpdateFollowMutation();

  //Image modal
  const dispatch = useAppDispatch();

  return (
    <div className="grid gap-3 overflow-hidden">
      <img
        src={profileOwner.profilePic}
        alt="profile"
        className="w-full h-[400px] object-cover cursor-pointer"
        onClick={() => {
          dispatch(setImageToShow(profileOwner.profilePic));
          dispatch(setShowImage());
        }}
      />
      <div className="grid gap-3">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-2xl">{profileOwner.name}</p>
            {(profileOwner.username && username) === currentUser.username ? (
              <Link to={`/settings/profile`} className="text-[#0caa49]">
                Edit Proflie
              </Link>
            ) : (
              <button
                className={`text-[#0caa49]`}
                onClick={() =>
                  updateFollow({
                    userId: currentUser._id,
                    followId: profileOwner._id,
                    token,
                  })
                    .unwrap()
                    .then((result) => setCurrentUser(result))
                }
              >
                {profileOwner.followers.some((item) => item === currentUser._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          </div>
          <p className="text-slate-500">@{profileOwner.username}</p>
        </div>
        {profileOwner.bio && (
          <p className=" leading-snug text-lg whitespace-pre-wrap">{profileOwner.bio}</p>
        )}
        {profileOwner.location && (
          <div className="text-sm flex gap-2 items-center">
            <BiWorld className="text-2xl text-[#0caa49]" />
            <p className="text-[1rem]">{profileOwner.location}</p>
          </div>
        )}
        <div className="flex gap-4 text-[1.1rem]">
          <Link
            to={`/profile/${profileOwner.username}/followers`}
            className="flex items-center gap-1"
          >
            {profileOwner.followers.length}
            <span className="text-sm text-slate-400">
              Follower{profileOwner.followers.length > 1 && "s"}
            </span>
          </Link>
          <Link
            to={`/profile/${profileOwner.username}/following`}
            className="flex items-center gap-1"
          >
            {profileOwner.following.length}{" "}
            <span className="text-sm text-slate-400">Following</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
