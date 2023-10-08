import Express from "express";
import {
  getUser,
  getUserFriend,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifytoken } from "../middleware/auth.js";
const router = Express.Router();
/*READ*/
router.get("/:id", verifytoken, getUser);
router.get("/:id/friends", verifytoken, getUserFriend);
/*UPDATE*/
router.patch("/:id/:friend", verifytoken, addRemoveFriend);
export default router;
