import PostCard from "../../../../components/PostCard";
import Loader from "../../../../components/ui/Loader";
import { useSearchVal } from "./Search";

export default function SearchPosts() {
  //Access outlet context
  const { searchedPostsData, searchingPosts, searchVal } = useSearchVal();

  return (
    <div className="grid p-3">
      {!searchingPosts ? (
        searchedPostsData?.map((post) => (
          <PostCard key={post._id.toString()} post={post} />
        ))
      ) : (
        <Loader />
      )}
      {searchedPostsData && searchedPostsData.length === 0 && (
        <p className="text-center text-slate-500 mt-3">
          Cannot find "{searchVal}"
        </p>
      )}
    </div>
  );
}
