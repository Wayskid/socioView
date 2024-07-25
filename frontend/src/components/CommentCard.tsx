import moment from "moment";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { setImageToShow, setShowImage } from "../store/features/appSlice";
import AuthContext from "../context/AuthContext";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDeleteCommentMutation } from "../services/appApi";

export default function CommentCard({ comment }: { comment: CommentsTypes }) {
  //Show hide comment menu
  const [commentMenuShown, setCommentMenu] = useState(false);

  //Access current user info
  const token = useAppSelector((state) => state.auth.token);
  const { currentUser } = useContext(AuthContext);

  //Dispatch show hide image modal
  const dispatch = useAppDispatch();

  //Delete comment
  const [deleteComment] = useDeleteCommentMutation();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className="flex rounded-sm gap-1">
      <div>
        <Link to={`/profile/${comment.username}`}>
          <img
            src={comment.profilePic}
            alt="profile"
            className="w-10 h-10 rounded-md object-cover"
          />
        </Link>
      </div>
      <div
        className={` grid gap-2 w-[calc(100%-2rem)] py-1 px-2 ${
          darkMode ? "bg-[#262b31]" : "bg-slate-200"
        }`}
      >
        <div className="flex relative">
          <Link
            to={`/profile/${comment.username}`}
            className="flex gap-3 justify-self-start items-center"
          >
            <div className="grid content-center">
              <p className="text-sm">{comment.name}</p>
              <div className="flex gap-2 text-slate-400 text-[13px]">
                <p>@{comment.username}</p>
                <p>&#x2022;</p>
                <p>{moment(comment.createdAt.toString()).fromNow()}</p>
              </div>
            </div>
          </Link>
          {comment.userId === currentUser._id && (
            <button
              className="flex gap-1 ml-auto self-center p-1 pr-0 group text-[#0caa49]"
              onClick={() => setCommentMenu(!commentMenuShown)}
            >
              {commentMenuShown ? (
                <RiDeleteBin2Line
                  onClick={() => {
                    deleteComment({ token, commentId: comment._id });
                  }}
                />
              ) : (
                <>
                  <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
                  <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
                  <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
                </>
              )}
            </button>
          )}
        </div>
        {comment.commentMsg && (
          <p className="text-[16px]">{comment.commentMsg}</p>
        )}
        {comment.commentImg && (
          <img
            src={comment.commentImg}
            alt="profile"
            className="w-full max-h-[400px] rounded-md object-cover cursor-pointer"
            onClick={() => {
              dispatch(setImageToShow(comment.commentImg));
              dispatch(setShowImage());
            }}
          />
        )}
      </div>
    </div>
  );
}
