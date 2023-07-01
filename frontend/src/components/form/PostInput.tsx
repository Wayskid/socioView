import { LuImagePlus } from "react-icons/lu";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../reduxHooks";
import { useCreatePostMutation } from "../../services/appApi";
import AuthContext from "../../context/AuthContext";
import { useUploadToCloudinaryMutation } from "../../services/cloudinaryApi";
import { BiX } from "react-icons/bi";
import Loader from "../ui/Loader";

export default function PostInput() {
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);
  const [createdPost, setCreatedPost] = useState({
    userId: currentUser._id,
    postMsg: "",
    postImg: null,
  });
  const [newPost, { isLoading: creatingPost }] = useCreatePostMutation();
  const [imgUploadDet, { isLoading: uploadingImg }] =
    useUploadToCloudinaryMutation();

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

  //Save input to state
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCreatedPost({
      ...createdPost,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  }

  // Handle create post
  function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    //Post without image
    if (createdPost.postMsg && !createdPost.postImg) {
      newPost({
        token,
        newPost: { ...createdPost, postImg: "" },
      })
        .unwrap()
        .then(() => {
          setCreatedPost({
            userId: currentUser._id,
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
            newPost: { ...createdPost, postImg: result.secure_url },
          })
            .unwrap()
            .then(() => {
              setCreatedPost({
                userId: currentUser._id,
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
      className={`gap-2 grid p-3 border-b-4  ${
        darkMode ? "bg-[#1d2226] border-black" : "bg-white border-slate-300"
      }`}
      onSubmit={handleCreatePost}
    >
      <div className="flex gap-3">
        <img
          src={currentUser.profilePic}
          alt="profile"
          className="w-10 h-10 rounded-md object-cover"
        />
        <input
          name="postMsg"
          placeholder="Write a post"
          className={` w-[calc(100%-2.5rem)] outline-none py-[0.5rem] px-3 rounded-md focus:placeholder:text-transparent ${
            darkMode ? "bg-[#292e33]" : "bg-slate-200"
          }`}
          onChange={handleInputChange}
          value={createdPost.postMsg}
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
            onClick={() => setPreviewImage("")}
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
            onChange={handleInputChange}
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
        <button className="socioViewBtns text-sm py-1 px-6 rounded-md transition-[padding]">
          {uploadingImg || creatingPost ? (
            <Loader bgColor="bg-slate-900" />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </form>
  );
}
