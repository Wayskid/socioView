import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

//Get Profile
export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      followers: user.followers,
      following: user.following,
      blockedUsers: user.blockedUsers,
      location: user.location,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Get Followers
export const getFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );

    const formatted = followers.map(({ _id, name, username, profilePic }) => {
      return {
        _id,
        name,
        username,
        profilePic,
      };
    });

    res.status(200).json(formatted);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Get Following
export const getFollowing = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );

    const formatted = following.map(({ _id, name, username, profilePic }) => {
      return {
        _id,
        name,
        username,
        profilePic,
      };
    });
    res.status(200).json(formatted);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Update Follow
export const updateFollow = async (req, res) => {
  try {
    const { userId, followId } = req.params;
    const user = await User.findById(userId);
    const follow = await User.findById(followId);

    if (userId !== followId) {
      if (user.following.includes(followId)) {
        // unfollow the user with followId and update followId followers list
        user.following = user.following.filter((id) => id !== followId);
        follow.followers = follow.followers.filter((id) => id !== userId);
      } else if (!user.following.includes(followId)) {
        //follow the user with followId and update followId followers list
        user.following.push(followId);
        follow.followers.push(userId);
      }
    }

    const updatedUserFollow = await user.save();
    await follow.save();

    res.status(200).json(updatedUserFollow);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Edit profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, name, bio, location } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (name) {
      user.name = name;
      await Post.updateMany({ userId }, { name });
      await Comment.updateMany({ userId }, { name });
    }

    if (profilePic) {
      user.profilePic = profilePic;
      await Post.updateMany({ userId }, { profilePic });
      await Comment.updateMany({ userId }, { profilePic });
    }

    user.bio = bio;
    user.location = location;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
      profilePic: updatedUser.profilePic,
      followers: updatedUser.followers,
      following: updatedUser.following,
      blockedUsers: updatedUser.blockedUsers,
      location: updatedUser.location,
      bio: updatedUser.bio,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Suggest who to follow
export const whoToFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: { $ne: userId } });

    const whoToFollow = users
      .filter((user) => !user.followers.includes(userId)) //Suggest users current user doesn't follow
      .sort((a, b) => b.followers.length - a.followers.length) //Show users with more followers in desc order
      .slice(0, 4); //Show only 4 suggestions

    res.status(200).json(whoToFollow);
  } catch (err) {
    res.status(204).json(err.message);
  }
};
