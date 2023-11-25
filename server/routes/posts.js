import express from "express";
import { verifytoken } from "../middleware/auth.js";
import { commentPost, deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();
/*READ*/
router.get("/", verifytoken, getFeedPosts);
router.get("/:userId/posts", verifytoken, getUserPosts);
/*UPDATE*/
router.patch("/:id/like", verifytoken, likePost);
router.patch("/:id/comment",verifytoken,commentPost);
router.patch("/:id/deletePost",verifytoken,deletePost);
export default router;
