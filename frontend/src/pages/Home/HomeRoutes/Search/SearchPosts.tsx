import PostCard from "../../../../components/PostCard";
import Loader from "../../../../components/ui/Loader";
import { useSearchVal } from "./Search";

export default function SearchPosts() {
  //Access outlet context
  const { searchedPostsData, searchingPosts } = useSearchVal();

  return (
    <div className="grid p-3">
      {!searchingPosts ? (
        searchedPostsData?.map((post) => (
          <PostCard key={post._id.toString()} post={post} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
