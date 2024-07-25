import { useParams } from "react-router-dom";
import ProfileNav from "./UserPosts/ProfileNav";
import ProfileSummary from "./ProfileSummary";
import { useGetUserProfileQuery } from "../../../../services/appApi";
import { useAppSelector } from "../../../../reduxHooks";
import Loader from "../../../../components/ui/Loader";

export default function Profile() {
  //Get user Profile
  const { username } = useParams();

  //Get current user info
  const token = useAppSelector((state) => state.auth.token);

  //Get User profile information
  const { data: userProfileData } = useGetUserProfileQuery({
    username,
    token,
  });

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid  md:rounded-lg h-full ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <div className="profile grid content-start p-3">
        <p className="text-2xl font-medium mb-3">Profile</p>
        {userProfileData ? (
          <>
            <ProfileSummary profileOwner={userProfileData} />
            <ProfileNav />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
