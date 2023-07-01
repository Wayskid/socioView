import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAppSelector } from "./reduxHooks";
import EditProfile from "./pages/Home/HomeRoutes/Profile/EditProfile";
import Followers from "./pages/Home/HomeRoutes/Profile/UserFollows/Followers";
import Following from "./pages/Home/HomeRoutes/Profile/UserFollows/Following";
import Follows from "./pages/Home/HomeRoutes/Profile/UserFollows/Follows";
import Profile from "./pages/Home/HomeRoutes/Profile/Profile";
import Settings from "./pages/Home/HomeRoutes/Settings/Settings";
import Search from "./pages/Home/HomeRoutes/Search/Search";
import Bookmarks from "./pages/Home/HomeRoutes/Bookmarks/Bookmarks";
import Feed from "./pages/Home/HomeRoutes/Feed/Feed";
import UserPostsAll from "./pages/Home/HomeRoutes/Profile/UserPosts/AllUserPosts";
import UserPostsLiked from "./pages/Home/HomeRoutes/Profile/UserPosts/LikedUserPosts";
import UserPostsMedia from "./pages/Home/HomeRoutes/Profile/UserPosts/MediaUserPosts";
import SearchPeople from "./pages/Home/HomeRoutes/Search/SearchPeople";
import SearchPosts from "./pages/Home/HomeRoutes/Search/SearchPosts";
import SearchAll from "./pages/Home/HomeRoutes/Search/SearchAll";
import ChangePassword from "./pages/Home/HomeRoutes/Settings/ChangePassword";
import ImageModal from "./components/ui/ImageModal";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const { openCloseChangePassword, showImage } = useAppSelector(
    (state) => state.app
  );
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="login" />}>
          <Route index element={<Feed />}></Route>
          <Route path="bookmarks" element={<Bookmarks />}></Route>
          <Route path="search" element={<Search />}>
            <Route index element={<SearchAll />}></Route>
            <Route path="people" element={<SearchPeople />}></Route>
            <Route path="posts" element={<SearchPosts />}></Route>
          </Route>
          <Route path="profile/:username" element={<Profile />}>
            <Route index element={<UserPostsAll />}></Route>
            <Route path="posts_liked" element={<UserPostsLiked />}></Route>
            <Route path="posts_media" element={<UserPostsMedia />}></Route>
          </Route>
          <Route element={<Follows />}>
            <Route
              path="profile/:username/followers"
              element={<Followers />}
            ></Route>
            <Route
              path="profile/:username/following"
              element={<Following />}
            ></Route>
          </Route>
          <Route path="settings/profile" element={<EditProfile />}></Route>
          <Route path="settings/account" element={<Settings />}></Route>
        </Route>
        <Route
          path="login"
          element={token ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="register"
          element={token ? <Navigate to="/" /> : <Register />}
        ></Route>
      </Routes>

      {openCloseChangePassword && <ChangePassword />}
      {showImage && <ImageModal />}
    </div>
  );
}

export default App;
