import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { BiX } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import Loader from "../ui/Loader";
import { useAppSelector } from "../../reduxHooks";
import { useCreateCommentMutation } from "../../services/appApi";
import { useUploadToCloudinaryMutation } from "../../services/cloudinaryApi";

export default function CommentInput({ post }: { post: PostsTypes }) {
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);
  const [createdComment, setCreatedComment] = useState({
    postId: post._id,
    userId: currentUser._id,
    commentMsg: "",
    commentImg: null,
  });
  const [commentImageFile, setCommentImageFile] = useState("");
  const [newComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();
  const [imgUploadDet, { isLoading: uploadingImg }] =
    useUploadToCloudinaryMutation();

  //Handle image preview
  useEffect(() => {
    if (createdComment.commentImg) {
      const imgFile = createdComment.commentImg![0];
      const objectUrl = URL.createObjectURL(imgFile);
      setCommentImageFile(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [createdComment.commentImg]);

  //Save input to state
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCreatedComment({
      ...createdComment,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  }

  // Handle create post
  function handleCreateComment(e: FormEvent) {
    e.preventDefault();

    //Post without image
    if (createdComment.commentMsg && !createdComment.commentImg) {
      newComment({
        token,
        newComment: { ...createdComment, commentImg: "" },
      })
        .unwrap()
        .then(() => {
          setCreatedComment({
            postId: post._id,
            userId: currentUser._id,
            commentMsg: "",
            commentImg: null,
          });
        });
    }

    //Post with image
    if (createdComment.commentImg) {
      const imgFile = createdComment.commentImg![0];

      const imageData = new FormData();
      imageData.append("file", imgFile);
      imageData.append("upload_preset", "SocioView");
      imageData.append("cloud_name", "diiohnshc");

      imgUploadDet(imageData)
        .unwrap()
        .then((result) => {
          newComment({
            token,
            newComment: { ...createdComment, commentImg: result.secure_url },
          })
            .unwrap()
            .then(() => {
              setCreatedComment({
                postId: post._id,
                userId: currentUser._id,
                commentMsg: "",
                commentImg: null,
              });
              setCommentImageFile("");
            });
        });
    }
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <form
      className={`gap-2 grid p-2  rounded-sm ${
        darkMode ? "bg-[#262b31]" : "bg-slate-200"
      }`}
      onSubmit={handleCreateComment}
    >
      <div className="flex gap-3">
        <img
          src={currentUser.profilePic}
          alt="profile"
          className="w-10 h-10 rounded-sm object-cover"
        />
        <input
          name="commentMsg"
          placeholder="Write a comment"
          className={` w-[calc(100%-2.5rem)] outline-none px-3 rounded-md focus:placeholder:text-transparent text-sm ${
            darkMode ? "bg-[#373d43]" : "bg-slate-300"
          }`}
          onChange={handleInputChange}
          value={createdComment.commentMsg}
        />
      </div>
      {commentImageFile && (
        <div className="bg-slate-700 relative p-6 rounded-md">
          <img
            src={commentImageFile}
            alt="preview"
            className="w-full max-h-[500px] object-cover"
          />
          <button
            className="absolute top-2 right-2 text-4xl text-[#0caa49] bg-slate-900 rounded-full"
            onClick={() => setCommentImageFile("")}
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
            id="commentImg"
            name="commentImg"
            className="hidden"
          />
          <label
            htmlFor="commentImg"
            className="flex gap-1 text-sm cursor-pointer"
          >
            <LuImagePlus className="text-[#0caa49] text-xl grid" />
          </label>
        </button>
        <button className="socioViewBtns text-sm py-1 px-3 rounded-md transition-[padding]">
          {uploadingImg || creatingComment ? (
            <Loader bgColor="bg-slate-900" />
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
}
