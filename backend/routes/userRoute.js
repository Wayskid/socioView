import express from "express";
import {
  Register,
  Login,
  usernameSetting,
  emailSetting,
  searchUsers,
  changePassword,
} from "../controllers/userController.js";

const usersRoute = express.Router();

//Register user
usersRoute.post("/", Register);

//Login
usersRoute.post("/login", Login);

//Account settings
usersRoute.patch("/settings/username/:userId", usernameSetting);
usersRoute.patch("/settings/email/:userId", emailSetting);

//Search users
usersRoute.get("/search/users", searchUsers);

//Change password
usersRoute.patch("/settings/password/:userId", changePassword);

export default usersRoute;
