import { Router } from "express";
import {
  toggleSubscription,
  getChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // all subscription routes need login

router.route("/c/:channelId").post(toggleSubscription);          // subscribe/unsubscribe
router.route("/c/:channelId/subscribers").get(getChannelSubscribers); // get subscribers
router.route("/my-subscriptions").get(getSubscribedChannels);    // get my subscriptions

export default router;