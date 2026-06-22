import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJWT);
router
  .route("/")
  .get(getAllVideos)        
  .post(
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishAVideo           
  );
router
  .route("/:videoId")
  .get(getVideoById)        // GET    /videos/:videoId
  .patch(
    upload.single("thumbnail"),
    updateVideo             // PATCH  /videos/:videoId
  )
  .delete(deleteVideo);     // DELETE /videos/:videoId
router
  .route("/toggle/publish/:videoId")
  .patch(togglePublishStatus); // PATCH /videos/toggle/publish/:videoId
export default router;