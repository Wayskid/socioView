import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateFromEmail } from "unique-username-generator";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

//Register
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) throw new Error("User already exist");

    //Generate random username from email
    const generatedUsername = generateFromEmail(email, 3);

    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      username: generatedUsername,
      password: passwordHash,
      profilePic:
        "https://res.cloudinary.com/diiohnshc/image/upload/v1687024753/SocioView/wvx4d40egtfrpoipnvqi.png",
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      username: savedUser.username,
      profilePic: savedUser.profilePic,
      followers: savedUser.followers,
      following: savedUser.following,
      blockedUsers: savedUser.blockedUsers,
      location: savedUser.location,
      bio: savedUser.bio,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
      token,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//Login
export const Login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

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
      token,
    });
  } catch (err) {
    res.status(401).json(err.message);
  }
};

export const usernameSetting = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    const users = await User.find({});
    const user = await User.findById(userId);

    if (users.some((user) => user.username === newUsername)) {
      throw new Error("Username already taken");
    } else {
      user.username = newUsername;
      await Post.updateMany({ userId }, { username: newUsername });
      await Comment.updateMany({ userId }, { username: newUsername });

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
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const emailSetting = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newEmail } = req.body;

    const users = await User.find({});
    const user = await User.findById(userId);

    if (users.some((user) => user.email === newEmail)) {
      throw new Error("Email already exists");
    } else {
      user.email = newEmail;
      await Post.updateMany({ userId }, { email: newEmail });
      await Comment.updateMany({ userId }, { email: newEmail });

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
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//Search Users
export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const users = await User.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          username: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(204).json(error.message);
  }
};

//Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    //Check current password then update
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) throw new Error("Password is incorrect");

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    await user.save();
    res.status(200).json("Changed successfully");
  } catch (err) {
    res.status(204).json(err.message);
  }
};
