import Post from "../models/postModel.js";
import User from "../models/userModel.js";

//Create post
export const createPost = async (req, res) => {
  try {
    const { userId, postMsg, postImg } = req.body;

    const user = await User.findById(userId);

    const newPost = await Post.create({
      userId,
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
      postMsg,
      postImg,
      likes: [],
      numberOfComments: 0,
    });

    const postCreated = await newPost.save();
    res.status(201).json(postCreated);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

//Get Feed
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Get all user posts
export const getAllUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await Post.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Get posts user liked
export const getPostsUserLiked = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    const posts = await Post.find({}).sort({ createdAt: -1 });

    const likedPosts = posts.filter((post) => {
      return post.likes.includes(user._id);
    });
    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Get user media posts
export const getMediaUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await Post.find({ username }).sort({
      createdAt: -1,
    });

    const mediaPost = posts.filter((post) => {
      if (post.postImg) return post;
    });
    res.status(200).json(mediaPost);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Like post
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.find((likeId) => likeId === userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Delete Post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const postToDelete = await Post.deleteOne({ _id: postId });

    res.status(202).json(postToDelete);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Add to bookmark
export const addToBookmark = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const posts = await Post.findById(postId);

    if (posts.bookmarks.includes(userId)) {
      //remove bookmark
      posts.bookmarks = posts.bookmarks.filter((user) => user !== userId);
    } else {
      //Add to bookmark
      posts.bookmarks.push(userId);
    }

    const updatedPost = await posts.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Get bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({});

    const userBookmarks = posts.filter((post) => {
      if (post.bookmarks.includes(userId)) {
        return post;
      }
    });

    res.status(200).json(userBookmarks);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Search Posts
export const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log(keyword);
    const posts = await Post.find({
      $or: [
        {
          postMsg: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(204).json(error.message);
  }
};
