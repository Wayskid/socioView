import logoIcon from "../../assets/img/socioview.png";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useUploadToCloudinaryMutation } from "../../services/cloudinaryApi";
import { useEditProfileMutation } from "../../services/appApi";
import { setIsReg } from "../../store/features/authSlice";
import AppButton from "../../components/ui/AppButton";

export default function Avatar() {
  //Get current User info
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Save input to state
  const [newProfilePic, setNewProfilePic] = useState<FileList | null>(null);

  //Handle image preview
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (newProfilePic) {
      const imgFile = newProfilePic![0];
      const objectUrl = URL.createObjectURL(imgFile);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [newProfilePic]);

  // Handle set profile pic
  const [imgUploadDet, { isLoading: settingProfilePic }] =
    useUploadToCloudinaryMutation();

  const [profileUpdate] = useEditProfileMutation();

  function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();
    if (newProfilePic) {
      const imgFile = newProfilePic![0];
      const imgData = new FormData();
      imgData.append("file", imgFile);
      imgData.append("upload_preset", "SocioView");
      imgData.append("cloud_name", "diiohnshc");

      imgUploadDet(imgData)
        .unwrap()
        .then((fulfilled) => {
          profileUpdate({
            token,
            userId: currentUser._id,
            updateProfileVal: {
              name: currentUser.name,
              bio: currentUser.bio,
              location: currentUser.location,
              profilePic: fulfilled.secure_url,
            },
          })
            .unwrap()
            .then((result) => {
              setCurrentUser(result);
              dispatch(setIsReg(false));
              navigate(`/`);
            });
        });
    }
  }

  return (
    <div className="grid justify-items-center content-center text-slate-200 gap-12 w-[min(24rem,90%)] justify-self-center py-3">
      <Link to="/" className="logo flex items-center gap-5">
        <img src={logoIcon} alt="" className="w-10" />
        <p className="text-3xl">SOCIOVIEW</p>
      </Link>
      <div className="bg-slate-800 rounded-lg py-10 px-5 grid gap-10 w-full relative">
        <div className="grid gap-2 text-center">
          <p className="text-xl ">Set Profile</p>
          <p className="text-xs font-thin">
            Choose profile picture or skip to let us choose for you
          </p>
        </div>
        <form className="grid gap-5" onSubmit={handleUpdateProfile}>
          {
            <img
              src={previewImage ? previewImage : currentUser.profilePic}
              alt="preview"
              className=" w-full max-h-72 rounded-md object-cover justify-self-center"
            />
          }
          <label
            className="justify-self-center text-lg cursor-pointer border-b-2 border-[#0caa49]"
            htmlFor="uploadImg"
          >
            <p>Upload picture</p>
          </label>
          <input
            className="hidden"
            type="file"
            name="profilePic"
            id="uploadImg"
            accept="image/*"
            onChange={(e) => setNewProfilePic(e.target.files)}
          ></input>
          <AppButton
            label="Finish"
            height="10"
            isLoading={settingProfilePic}
            isDisabled={
              newProfilePic && settingProfilePic === false ? false : true
            }
          />
          <AppButton
            label="Skip"
            regular={true}
            handleClick={() => dispatch(setIsReg(false))}
          />
        </form>
      </div>
    </div>
  );
}
