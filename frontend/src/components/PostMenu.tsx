import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  useAddToBookmarkMutation,
  useDeletePostMutation,
  useUpdateFollowMutation,
} from "../services/appApi";
import { useAppSelector } from "../reduxHooks";
import { ImBin } from "react-icons/im";
import { RiUserFollowLine } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";

export default function PostMenu({
  postMenuShown,
  post,
}: {
  postMenuShown: Boolean;
  post: PostsTypes;
}) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth.token);

  //Delete post
  const [deletePost] = useDeletePostMutation();

  //Update follow
  const [updateFollow] = useUpdateFollowMutation();

  //Add to bookmark
  const [addToBoomark] = useAddToBookmarkMutation();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, visibility: "hidden" },
        end: { opacity: 1, visibility: "visible" },
      }}
      animate={!postMenuShown ? "initial" : "end"}
      className={`navProfileMenu absolute w-40 right-0  rounded-md overflow-hidden border-slate-700 border top-[2rem] grid text-sm ${
        darkMode ? "bg-black" : "bg-slate-200"
      }`}
    >
      <button
        className={`py-3  ease-in flex items-center justify-center gap-1 border-b border-b-slate-700 ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300"
        }`}
        onClick={() =>
          addToBoomark({ token, postId: post._id, userId: currentUser._id })
        }
      >
        <BsBookmark />
        {post.bookmarks.includes(currentUser._id)
          ? "Remove Bookmark"
          : "Bookmark"}
      </button>
      {currentUser._id !== post.userId && (
        <button
          className={`py-3 ease-in flex items-center justify-center gap-1 ${
            darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300 "
          }`}
          onClick={() =>
            updateFollow({
              userId: currentUser._id,
              followId: post.userId,
              token,
            })
              .unwrap()
              .then((result) => setCurrentUser(result))
          }
        >
          <RiUserFollowLine />
          {currentUser.following.some((item) => item === post.userId)
            ? "Unfollow "
            : "Follow "}
          @{post.username}
        </button>
      )}
      {currentUser._id === post.userId && (
        <button
          className={`py-3  ease-in flex items-center justify-center gap-1 ${
            darkMode ? "hover:bg-slate-800" : "hover:bg-slate-300"
          }`}
          onClick={() => {
            deletePost({ token, postId: post._id });
          }}
        >
          <ImBin />
          Delete Post
        </button>
      )}
    </motion.div>
  );
}
