import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark, BiCommentDetail } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  useGetCommentsLengthQuery,
  useLikePostMutation,
} from "../services/appApi";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import PostMenu from "./PostMenu";
import Comments from "./Comments";
import { setImageToShow, setShowImage } from "../store/features/appSlice";

export default function PostCard({ post }: { post: PostsTypes }) {
  //Access current user info
  const token = useAppSelector((state) => state.auth.token);
  const { currentUser } = useContext(AuthContext);

  //Handle Like post
  const [likePost] = useLikePostMutation();

  //Show or hide post menu and comment section
  const [postMenuShown, setPostMenuShown] = useState(false);
  const [commentsShown, setCommentsShown] = useState(false);

  //Handle get post comments length
  const { data: commentsLengthResult } = useGetCommentsLengthQuery({
    token,
    postId: post._id,
  });

  //Image modal
  const dispatch = useAppDispatch();

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  //Close post menu
  const menuRef = useRef(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current !== e.target) {
        setPostMenuShown(false);
      }
    }
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <div
      className={`postCard grid gap-3 border-b-4  p-3 ${
        darkMode ? "bg-[#1d2226] border-black" : "border-slate-300 bg-white"
      }`}
    >
      <div className="flex relative">
        <Link
          to={`/profile/${post.username}`}
          className="flex gap-3 justify-self-start items-center"
        >
          <img
            src={post.profilePic}
            alt="profile"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="grid content-center">
            <p className="text-lg leading-[1]">
              {post.name.slice(0, 10)}
              {post.name.length > 10 && "..."}
            </p>
            <div className="flex gap-2 text-slate-500 text-[14px] items-center">
              <p className="text-[15px]">
                @{post.username.slice(0, 10)}
                {post.username.length > 10 && "..."}
              </p>
              <p className="self-end">&#x2022;</p>
              <p className="self-end">
                {moment(post.createdAt.toString()).fromNow()}
              </p>
            </div>
          </div>
        </Link>
        <button
          className="flex gap-1 ml-auto self-center h-8 w-8 items-center justify-center group hover:bg-[#ffffff18] rounded-full transition-[background]"
          onClick={() => setPostMenuShown(!postMenuShown)}
          ref={menuRef}
        >
          <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
          <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
          <div className="w-[0.2rem] h-[0.2rem] bg-[#0caa49] group-hover:bg-[#03d048]"></div>
        </button>
        <PostMenu postMenuShown={postMenuShown} post={post} />
      </div>
      {post.postMsg && (
        <p className="text-[20px] whitespace-pre-wrap">{post.postMsg}</p>
      )}
      {post.postImg && (
        <img
          src={post.postImg}
          alt="profile"
          className="w-full max-h-[500px] rounded-md object-cover cursor-pointer"
          onClick={() => {
            dispatch(setImageToShow(post.postImg));
            dispatch(setShowImage());
          }}
        />
      )}
      <div className="grid">
        <div className="flex justify-between text-slate-500">
          <button className="flex items-center justify-center gap-2 rounded-md">
            <div
              className="relative grid"
              onClick={() => {
                likePost({
                  postId: post._id,
                  userId: currentUser._id,
                  token,
                });
              }}
            >
              <AiOutlineHeart className={`text-xl`} />
              {post.likes.includes(currentUser._id) && (
                <AiFillHeart className="text-xl text-red-700 absolute" />
              )}
            </div>
            <p className="text-sm rounded-full content-center grid place-content-center">
              {post.likes.length}
            </p>
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-md ease-in"
            onClick={() => setCommentsShown(!commentsShown)}
          >
            <BiCommentDetail className="text-xl" />
            <p className="text-[14px] rounded-full content-center grid place-content-center">
              {commentsLengthResult?.toString()}
            </p>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-md ease-in">
            <BiBookmark className="text-xl" />
            <p className="text-[14px] rounded-full content-center grid place-content-center">
              {post.bookmarks.length}
            </p>
          </button>
        </div>
      </div>
      {commentsShown && <Comments post={post} />}
    </div>
  );
}
