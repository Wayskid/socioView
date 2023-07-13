import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/mongoDB.js";
import userRoute from "./routes/userRoute.js";
import { verifyToken } from "./middleware/authToken.js";
import profileRoute from "./routes/profileRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30md", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30md", extended: true }));

const corsOrigin = {
  origin: ["https://socioview.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  optionSuccessStatus: 204,
  preflightContinue: false,
};
app.use(cors(corsOrigin));

//Api
app.use("/api/users", userRoute);
app.use("/api/profile", verifyToken, profileRoute);
app.use("/api/posts", verifyToken, postRoute);
app.use("/api/comments", verifyToken, commentRoute);

//Port
const PORT = process.env.PORT || 1000;
connectToDB();
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
