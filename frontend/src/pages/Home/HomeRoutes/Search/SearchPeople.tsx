import FollowCard from "../../../../components/FollowCard";
import Loader from "../../../../components/ui/Loader";
import { useSearchVal } from "./Search";

export default function SearchPeople() {
  //Access outlet context
  const { searchedUserData, searchingUsers } = useSearchVal();

  return (
    <div className="grid p-3">
      {!searchingUsers ? (
        searchedUserData?.map((user) => (
          <FollowCard
            key={user._id.toString()}
            user={user}
            showMutualFollow={true}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
