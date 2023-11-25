import Express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUserBySearch,
} from "../controllers/users.js";
import { verifytoken } from "../middleware/auth.js";
const router = Express.Router();
/*READ*/
router.get("/:id", verifytoken, getUser);
router.get("/:id/friends", verifytoken, getUserFriends);
router.get("/:searchUser/getUserBySearch",verifytoken,getUserBySearch);
/*UPDATE*/
router.patch("/:id/:friendId", verifytoken, addRemoveFriend);
export default router;
