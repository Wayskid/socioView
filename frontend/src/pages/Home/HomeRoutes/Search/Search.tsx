import FormInput from "../../../../components/form/FormInput";
import { FiSearch } from "react-icons/fi";
import { ChangeEvent, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useAppSelector } from "../../../../reduxHooks";
import {
  useSearchPostsMutation,
  useSearchUsersMutation,
} from "../../../../services/appApi";

export default function Search() {
  //Active nav
  const location = useLocation();
  function matchRoute(route: String) {
    if (route === location.pathname) {
      return true;
    }
  }

  //Current user info
  const token = useAppSelector((state) => state.auth.token);

  //Input state
  const [searchVal, setSearchVal] = useState("");

  //Search Users
  const [searchUsers, { data: searchedUserData, isLoading: searchingUsers }] =
    useSearchUsersMutation();

  //Search Posts
  const [searchPosts, { data: searchedPostsData, isLoading: searchingPosts }] =
    useSearchPostsMutation();

  //Handle search
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value);

    searchUsers({
      token,
      keyword: e.target.value.trim(),
    });

    searchPosts({
      token,
      keyword: e.target.value.trim(),
    });
  }

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div className={`grid  h-full ${darkMode ? "bg-[#1d2226]" : "bg-white"}`}>
      <div className="grid content-start p-3">
        <FormInput
          theme={true}
          Icon={<FiSearch />}
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          handleChange={handleSearch}
        />
        {searchVal ? (
          <>
            <div className="flex justify-around justify-items-center border-b-slate-500 border-b">
              <Link
                to={"."}
                className={`py-2 border-b-4  transition-[border] font-medium ${
                  matchRoute(`/Search`)
                    ? "text-[#0caa49] border-[#0caa49]"
                    : "border-transparent"
                }`}
              >
                All
              </Link>
              <Link
                to={"people"}
                className={`py-2 border-b-4  transition-[border] font-medium ${
                  matchRoute(`/Search/people`)
                    ? "text-[#0caa49] border-[#0caa49]"
                    : "border-transparent"
                }`}
              >
                People
              </Link>
              <Link
                to={"posts"}
                className={`py-2 border-b-4  transition-[border] font-medium ${
                  matchRoute(`/Search/posts`)
                    ? "text-[#0caa49] border-[#0caa49]"
                    : "border-transparent"
                }`}
              >
                Posts
              </Link>
            </div>
            <ul className="grid gap-5">
              <Outlet
                context={{
                  searchVal,
                  searchedUserData,
                  searchingUsers,
                  searchedPostsData,
                  searchingPosts,
                }}
              />
            </ul>
          </>
        ) : (
          <p className="text-center text-slate-500 mt-3">
            Try searching for people or post keywords
          </p>
        )}
      </div>
    </div>
  );
}

interface OutletContextType {
  searchVal: String;
  searchedUserData: UserInfoType[];
  searchingUsers: Boolean;
  searchedPostsData: PostsTypes[];
  searchingPosts: Boolean;
}

export function useSearchVal() {
  return useOutletContext<OutletContextType>();
}
