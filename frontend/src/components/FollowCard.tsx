import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useUpdateFollowMutation } from "../services/appApi";
import { useAppSelector } from "../reduxHooks";
import { RiUserFollowLine } from "react-icons/ri";
import AppButton from "./ui/AppButton";

export default function FollowCard({
  user,
  showMutualFollow,
}: {
  user: UserInfoType;
  showMutualFollow?: Boolean;
}) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);
  const [updateFollow, { isLoading: updatingFollow }] =
    useUpdateFollowMutation();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <li
      key={user._id.toString()}
      className={`flex gap-3 cursor-pointer border-b-4  p-3 [&>:last-child:not(div)]:ml-auto ${
        darkMode ? "bg-[#1d2226] border-black" : "bg-white border-slate-300"
      }`}
    >
      <div
        className="flex gap-3"
        onClick={() => navigate(`../../profile/${user.username}`)}
      >
        <img
          src={user.profilePic}
          alt="profile"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="grid content-center">
          <p className="text-lg">
            {user.name.slice(0, 15)}
            {user.name.length > 15 && "..."}
          </p>
          <div className="flex gap-2 text-slate-500 text-[12px]">
            <p className="leading-[0.8] ">
              @{user.username.slice(0, 15)}
              {user.username.length > 15 && "..."}
            </p>
          </div>
        </div>
      </div>
      {showMutualFollow &&
        currentUser.followers.some((id) => id === user._id) && (
          <RiUserFollowLine className="self-center" />
        )}
      {currentUser._id !== user._id && (
        <AppButton
          regular={true}
          label={
            currentUser.following.some((userId) => userId == user._id)
              ? "Unfollow"
              : "Follow"
          }
          isLoading={updatingFollow}
          handleClick={() =>
            updateFollow({
              userId: currentUser._id,
              followId: user._id,
              token,
            })
              .unwrap()
              .then((result) => setCurrentUser(result))
          }
        />
      )}
    </li>
  );
}
