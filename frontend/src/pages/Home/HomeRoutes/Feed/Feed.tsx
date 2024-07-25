import { useEffect, useState } from "react";
import PostInput from "../../../../components/form/PostInput";
import Loader from "../../../../components/ui/Loader";
import PostCard from "../../../../components/PostCard";
import { useAppSelector } from "../../../../reduxHooks";
import { useGetFeedsQuery } from "../../../../services/appApi";

export default function Feed() {
  //Access current user token
  const token = useAppSelector((state) => state.auth.token);

  //Handle the get all posts
  const { data: feedData, isFetching } = useGetFeedsQuery(token);

  //Infinite Scrolling
  const [page, setPage] = useState(15);
  const postsFeed = feedData ?? [];
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY !== document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setTimeout(() => {
          setPage(page + 3);
        }, 1000);
      }
    };
    document.addEventListener("scroll", onScroll);
    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid h-full  ${darkMode ? "bg-black" : "bg-white"}`}
      id="feed"
    >
      <div className="grid content-start">
        <PostInput />
        {feedData ? (
          postsFeed?.slice(0, page).map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
