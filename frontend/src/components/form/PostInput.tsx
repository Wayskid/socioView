import { LuImagePlus } from "react-icons/lu";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../reduxHooks";
import { useCreatePostMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useUploadToCloudinaryMutation } from "../../services/cloudinaryApi";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import TextAreaInput from "./TextAreaInput";
import AppButton from "../ui/AppButton";

export default function PostInput() {
  //Access current user info
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Save input to state
  const [createdPost, setCreatedPost] = useState<{
    postMsg: string;
    postImg: FileList | null;
  }>({
    postMsg: "",
    postImg: null,
  });

  //Handle image preview
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (createdPost.postImg) {
      const imgFile = createdPost.postImg![0];
      const objectUrl = URL.createObjectURL(imgFile);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [createdPost.postImg]);

  //Upload image to cloudinary
  const [imgUploadDet, { isLoading: uploadingImg }] =
    useUploadToCloudinaryMutation();

  //Create post
  const [newPost, { isLoading: creatingPost }] = useCreatePostMutation();

  // Handle create post
  function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    //Post without image
    if (createdPost.postMsg && !createdPost.postImg) {
      newPost({
        token,
        newPost: {
          userId: currentUser._id,
          postMsg: createdPost.postMsg,
          postImg: "",
        },
      })
        .unwrap()
        .then(() => {
          setCreatedPost({
            postMsg: "",
            postImg: null,
          });
        });
    }

    //Post with image
    if (createdPost.postImg) {
      const imgFile = createdPost.postImg![0];

      const imageData = new FormData();
      imageData.append("file", imgFile);
      imageData.append("upload_preset", "SocioView");
      imageData.append("cloud_name", "diiohnshc");

      imgUploadDet(imageData)
        .unwrap()
        .then((result) => {
          newPost({
            token,
            newPost: {
              userId: currentUser._id,
              postMsg: createdPost.postMsg,
              postImg: result.secure_url,
            },
          })
            .unwrap()
            .then(() => {
              setCreatedPost({
                postMsg: "",
                postImg: null,
              });
              setPreviewImage("");
            });
        });
    }
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <form
      className={`postInput gap-2 grid p-3 border-b-4  ${
        darkMode ? "bg-[#1d2226] border-black" : "bg-white border-slate-300"
      }`}
      onSubmit={handleCreatePost}
    >
      <div className="flex gap-3">
        <Link to={`/profile/${currentUser.username}`}>
          <img
            src={currentUser.profilePic}
            alt="profile"
            className="w-10 h-10 rounded-md object-cover"
          />
        </Link>
        <TextAreaInput
          name="postMsg"
          placeholder="Write your view . . ."
          value={createdPost.postMsg}
          handleChange={(e) =>
            setCreatedPost({ ...createdPost, postMsg: e.target.value })
          }
        />
      </div>
      {previewImage && (
        <div
          className={` relative p-6 rounded-md ${
            darkMode ? "bg-[#292e33]" : "bg-slate-200"
          }`}
        >
          <img
            src={previewImage}
            alt="preview"
            className="w-full max-h-[500px] object-cover"
          />
          <button
            className="absolute top-1 right-1 text-4xl text-[#0caa49] bg-slate-100 rounded-full"
            onClick={() => {
              setPreviewImage("");
              setCreatedPost({ ...createdPost, postImg: null });
            }}
            type="button"
          >
            <BiX />
          </button>
        </div>
      )}
      <div className="flex items-center justify-end gap-4">
        <button className="flex items-end gap-1" type="button">
          <input
            type="file"
            onChange={(e) =>
              setCreatedPost({ ...createdPost, postImg: e.target.files })
            }
            id="postImg"
            name="postImg"
            className="hidden"
          />
          <label
            htmlFor="postImg"
            className="flex gap-1 text-sm cursor-pointer"
          >
            <LuImagePlus className="text-[#0caa49] text-2xl grid" />
          </label>
        </button>
        <AppButton
          label="Post"
          width="w-24"
          height="8"
          isLoading={uploadingImg || creatingPost}
          isDisabled={
            createdPost.postMsg.length > 0 || createdPost.postImg ? false : true
          }
        />
      </div>
    </form>
  );
}
