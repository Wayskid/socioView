import { useContext, useEffect, useState } from "react";
import { useEditProfileMutation } from "../../../../services/appApi";
import { useUploadToCloudinaryMutation } from "../../../../services/cloudinaryApi";
import AuthContext from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import Loader from "../../../../components/ui/Loader";
import FormInput from "../../../../components/form/FormInput";
import { BiUser, BiWorld, BiEdit } from "react-icons/bi";
import { RiImageEditLine } from "react-icons/ri";
import { TbArrowsExchange } from "react-icons/tb";
import { setAlertMsg, setShowAlert } from "../../../../store/features/appSlice";
import TextAreaInput from "../../../../components/form/TextAreaInput";
import AppButton from "../../../../components/ui/AppButton";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Access current user info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Save edit profile inputs to state
  const [profileUpdateVal, setProfileUpdateVal] = useState<{
    name: string;
    bio: string;
    location: string;
    profilePic: FileList | null;
  }>({
    name: currentUser.name,
    bio: currentUser.bio,
    location: currentUser.location,
    profilePic: null,
  });

  //Upload to cloudinary
  const [imgUploadDet, { isLoading: uploadingImg }] =
    useUploadToCloudinaryMutation();

  //Update profile
  const [profileUpdate, { isLoading: updatingProfile }] =
    useEditProfileMutation();

  //Handle upload to cloudinary
  async function handleUpdateProfile() {
    if (profileUpdateVal.profilePic) {
      const imgFile = profileUpdateVal.profilePic![0];
      const imgData = new FormData();
      imgData.append("file", imgFile);
      imgData.append("upload_preset", "SocioView");
      imgData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      // Handle update profile with image
      imgUploadDet(imgData)
        .unwrap()
        .then((fulfilled) => {
          profileUpdate({
            token,
            userId: currentUser._id,
            updateProfileVal: {
              ...profileUpdateVal,
              profilePic: fulfilled.secure_url,
            },
          })
            .unwrap()
            .then((result) => {
              setCurrentUser(result);
              navigate(`/profile/${currentUser.username}`);
              dispatch(setAlertMsg("Profile Updated"));
              dispatch(setShowAlert(true));
            });
        });
    }

    //Handle update profile without image
    if (
      !profileUpdateVal.profilePic &&
      (profileUpdateVal.name !== currentUser.name ||
        profileUpdateVal.bio !== currentUser.bio ||
        profileUpdateVal.location !== currentUser.location)
    ) {
      profileUpdate({
        token,
        userId: currentUser._id,
        updateProfileVal: {
          ...profileUpdateVal,
          profilePic: "",
        },
      })
        .unwrap()
        .then((fulfilled) => {
          setCurrentUser(fulfilled);
          navigate(`/profile/${currentUser.username}`);
          dispatch(setAlertMsg("Profile Updated"));
          dispatch(setShowAlert(true));
        });
    }
  }

  //Handle image preview
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (profileUpdateVal.profilePic) {
      const imgFile = profileUpdateVal.profilePic![0];
      const objectUrl = URL.createObjectURL(imgFile);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileUpdateVal.profilePic]);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className="grid relative">
      <div
        className={`editProfile grid md:gap-4 content-start p-3  ${
          darkMode ? "bg-[#1d2226]" : "bg-white"
        }`}
      >
        <div className="flex justify-between  items-center mb-3">
          <p className="text-2xl font-medium">Edit Profile</p>
          {!profileUpdateVal.profilePic &&
          profileUpdateVal.name === currentUser.name &&
          profileUpdateVal.bio === currentUser.bio &&
          profileUpdateVal.location === currentUser.location ? (
            <AppButton
              label="Cancel"
              regular={true}
              handleClick={() => navigate(`/profile/${currentUser.username}`)}
            />
          ) : (
            <AppButton
              label="Save"
              regular={true}
              handleClick={handleUpdateProfile}
            />
          )}
        </div>
        <div className="grid gap-8 rounded-lg">
          <div className="grid gap-1">
            <p>Profile picture</p>
            <div className="flex justify-between w-[min(30rem,100%)]">
              <div className="grid items-center gap-3 justify-self-start relative">
                <img
                  src={currentUser.profilePic}
                  alt="profile"
                  className="w-40 rounded-md h-40 object-cover"
                />
                <label
                  className="text-3xl text-slate-300 absolute justify-self-center w-full h-full bg-[#12121291] grid content-center justify-center cursor-pointer"
                  htmlFor="uploadImg"
                >
                  <RiImageEditLine />
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="profilePic"
                  id="uploadImg"
                  accept="image/*"
                  onChange={(e) =>
                    setProfileUpdateVal({
                      ...profileUpdateVal,
                      profilePic: e.target.files,
                    })
                  }
                ></input>
              </div>
              {previewImage && (
                <TbArrowsExchange className="self-center text-3xl" />
              )}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-40 rounded-md h-40 object-cover"
                />
              )}
            </div>
          </div>
          <div className="grid gap-1 w-[min(30rem,100%)]">
            <p>Display Name</p>
            <FormInput
              theme={true}
              Icon={<BiUser />}
              id="name"
              name="name"
              type="text"
              placeholder="name"
              value={profileUpdateVal.name}
              handleChange={(e) =>
                setProfileUpdateVal({
                  ...profileUpdateVal,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-1 w-[min(30rem,100%)] ">
            <p>Bio</p>
            <div
              className={`flex gap-1 py-2 px-3 rounded-md ${
                darkMode ? "bg-[#292e33]" : "bg-slate-300"
              }`}
            >
              <BiEdit className="text-2xl mt-2" />
              <TextAreaInput
                name="bio"
                placeholder="Something about you"
                value={profileUpdateVal.bio}
                handleChange={(e) =>
                  setProfileUpdateVal({
                    ...profileUpdateVal,
                    bio: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-1 w-[min(30rem,100%)]">
            <p>Location</p>
            <FormInput
              theme={true}
              Icon={<BiWorld />}
              id="location"
              name="location"
              type="text"
              placeholder="Where you at?"
              value={profileUpdateVal.location}
              handleChange={(e) =>
                setProfileUpdateVal({
                  ...profileUpdateVal,
                  location: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      {updatingProfile && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
      {uploadingImg && (
        <div className="absolute h-full w-full bg-[#121212a8] grid justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
