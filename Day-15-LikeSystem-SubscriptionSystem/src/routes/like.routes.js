
import { Router } from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  getVideoLikes,
  getLikedVideos,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); 

router.route("/toggle/v/:videoId").post(toggleVideoLike);       // like/unlike video
router.route("/toggle/c/:commentId").post(toggleCommentLike);   // like/unlike comment
router.route("/video/:videoId").get(getVideoLikes);             // get total likes on video
router.route("/videos").get(getLikedVideos);                    // get all liked videos

export default router;