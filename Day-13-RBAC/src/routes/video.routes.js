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
import { authorizeRoles } from "../middlewares/rbac.middleware.js"; 

const router = Router();

router.use(verifyJWT); // all routes need login

router
  .route("/")
  .get(getAllVideos)                        
  .post(
    authorizeRoles("creator", "admin"),    
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishAVideo
  );

router
  .route("/:videoId")
  .get(getVideoById)                       
  .patch(
    authorizeRoles("creator", "admin"),    
    upload.single("thumbnail"),
    updateVideo
  )
  .delete(
    authorizeRoles("admin"),              
    deleteVideo
  );

router
  .route("/toggle/publish/:videoId")
  .patch(
    authorizeRoles("creator", "admin"),    
    togglePublishStatus
  );

export default router;