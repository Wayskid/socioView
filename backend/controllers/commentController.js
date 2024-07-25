import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

//Create comment
export const createComment = async (req, res) => {
  try {
    const { postId, userId, commentMsg, commentImg } = req.body;

    const user = await User.findById(userId);

    const newComment = await Comment.create({
      postId,
      userId,
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
      commentMsg,
      commentImg,
    });

    const createdComment = await newComment.save();
    res.status(200).json(createdComment);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Get comments
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Get comments length
export const getCommentsLength = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    res.status(200).json(comments.length);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const commentDeleted = await Comment.deleteOne({ _id: commentId });

    res.status(200).json(commentDeleted);
  } catch (error) {
    res.status(204).json(error.message);
  }
};
