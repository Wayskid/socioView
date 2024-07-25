import { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { BiX } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import { useAppSelector } from "../../reduxHooks";
import { useCreateCommentMutation } from "../../services/appApi";
import { useUploadToCloudinaryMutation } from "../../services/cloudinaryApi";
import TextAreaInput from "./TextAreaInput";
import AppButton from "../ui/AppButton";

export default function CommentInput({ post }: { post: PostsTypes }) {
  //Access current user info
  const { currentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Save input to state
  const [createdComment, setCreatedComment] = useState<{
    commentMsg: string;
    commentImg: FileList | null;
  }>({
    commentMsg: "",
    commentImg: null,
  });

  //Handle image preview
  const [commentImageFile, setCommentImageFile] = useState("");

  useEffect(() => {
    if (createdComment.commentImg) {
      const imgFile = createdComment.commentImg![0];
      const objectUrl = URL.createObjectURL(imgFile);
      setCommentImageFile(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [createdComment.commentImg]);

  //Save image to cloudinary
  const [imgUploadDet, { isLoading: uploadingImg }] =
    useUploadToCloudinaryMutation();

  //Create comment
  const [newComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();

  // Handle create post
  function handleCreateComment(e: FormEvent) {
    e.preventDefault();

    //Post without image
    if (createdComment.commentMsg && !createdComment.commentImg) {
      newComment({
        token,
        newComment: {
          postId: post._id,
          userId: currentUser._id,
          commentMsg: createdComment.commentMsg,
          commentImg: "",
        },
      })
        .unwrap()
        .then(() => {
          setCreatedComment({
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
            newComment: {
              postId: post._id,
              userId: currentUser._id,
              commentMsg: createdComment.commentMsg,
              commentImg: result.secure_url,
            },
          })
            .unwrap()
            .then(() => {
              setCreatedComment({
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
        <TextAreaInput
          name="commentMsg"
          placeholder="Write a comment"
          value={createdComment.commentMsg}
          handleChange={(e) =>
            setCreatedComment({ ...createdComment, commentMsg: e.target.value })
          }
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
            onChange={(e) =>
              setCreatedComment({
                ...createdComment,
                commentImg: e.target.files,
              })
            }
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
        <AppButton
          label="Comment"
          width="w-24"
          height="8"
          isLoading={uploadingImg || creatingComment}
          isDisabled={
            createdComment.commentMsg.length > 0 || createdComment.commentImg
              ? false
              : true
          }
        />
      </div>
    </form>
  );
}
