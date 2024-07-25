import { useGetCommentsQuery } from "../services/appApi";
import CommentCard from "./CommentCard";
import CommentInput from "./form/CommentInput";
import Loader from "./ui/Loader";
import { useAppSelector } from "../reduxHooks";

export default function Comments({
  post,
}: {
  post: PostsTypes;
}) {
  //Access current user info
  const token = useAppSelector((state) => state.auth.token);

  //Get comments
  const { data: commentsResult } = useGetCommentsQuery({
    token,
    postId: post._id,
  });

  return (
    <div className="comments grid grid-rows-[1] overflow-hidden gap-2">
      <CommentInput post={post} />
      {commentsResult ? (
        commentsResult.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
