import express from "express";
//import { getFeedposts, getUserPosts, likePost } from "./controllers/posts.js";
import { verifytoken } from "../middleware/auth.js";
import { getFeedposts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();
/*READ*/
router.get("/", verifytoken, getFeedposts);
router.get("/:userId/posts", verifytoken, getUserPosts);
/*UPDATE*/
router.patch("/:id/like", verifytoken, likePost);
export default router;
