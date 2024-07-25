export {};

declare global {

  interface AppContextTypes {
    followersData: UserInfoType[] | undefined;
    followingData: UserInfoType[] | undefined;
  }

  interface UserInfoType {
    _id: String;
    name: string;
    bio: string;
    email: String;
    username: String;
    blockedUsers: [];
    createdAt: Number;
    followers: [];
    following: [];
    location: string;
    profilePic: string;
    token: String;
    updatedAt: Number;
  }

  interface RegDetTypes {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  interface LoginDetTypes {
    emailOrUsername: String;
    password: String;
  }

  interface AuthContextType {
    currentUser: UserInfoType;
    setCurrentUser: Dispatch<React.SetStateAction<UserInfoType>>;
  }

  interface PostsTypes {
    _id: string;
    userId: String;
    username: String;
    name: String;
    profilePic: string;
    postMsg: String;
    postImg: string;
    likes: String[];
    comments: PostsTypes[];
    bookmarks: String[];
    createdAt: Number;
  }

  interface NewPostsTypes {
    userId: String;
    postMsg?: String;
    postImg?: String;
  }

  interface UpdateProfileTypes {
    name: String;
    bio: String;
    location: String;
    profilePic: String;
  }

  interface CommentsTypes {
    _id: string;
    postId: String;
    userId: String;
    username: String;
    name: String;
    profilePic: string;
    commentMsg: String;
    commentImg: string;
    createdAt: Number;
  }

  interface NewCommentsTypes {
    postId: String;
    userId: String;
    commentMsg?: String;
    commentImg?: String;
  }

  interface SocioNewsTypes {
    title: String;
    publishedAt: Number;
  }

  interface CloudinaryResultType {
    access_mode: String;
    asset_id: String;
    bytes: Number;
    created_at: String;
    etag: String;
    folder: String;
    format: String;
    height: Number;
    original_filename: String;
    placeholder: false;
    public_id: String;
    resource_typString;
    secure_url: String;
    signature: String;
    tags: [];
    type: String;
    url: String;
    version: Number;
    version_id: String;
    width: Number;
  }
}
