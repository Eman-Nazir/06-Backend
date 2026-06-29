import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ─────────────────────────────────────────
// TOGGLE SUBSCRIPTION
// ─────────────────────────────────────────
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  // cannot subscribe to yourself
  if (channelId === req.user._id.toString()) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  // check channel exists
  const channel = await User.findById(channelId);
  if (!channel) throw new ApiError(404, "Channel not found");

  // check if already subscribed
  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (existingSubscription) {
    // already subscribed → unsubscribe
    await Subscription.findByIdAndDelete(existingSubscription._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isSubscribed: false }, "Unsubscribed successfully"));
  }

  // not subscribed → subscribe
  await Subscription.create({
    subscriber: req.user._id,
    channel: channelId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { isSubscribed: true }, "Subscribed successfully"));
});

// ─────────────────────────────────────────
// GET CHANNEL SUBSCRIBERS
// ─────────────────────────────────────────
const getChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const channel = await User.findById(channelId);
  if (!channel) throw new ApiError(404, "Channel not found");

  const subscribers = await Subscription.aggregate([
    // find all subscribers of this channel
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    // join subscriber user details
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriberDetails",
        pipeline: [
          {
            $project: { username: 1, avatar: 1, fullName: 1 },
          },
        ],
      },
    },
    { $unwind: "$subscriberDetails" },
    {
      $project: {
        subscriberDetails: 1,
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSubscribers: subscribers.length,
        subscribers,
      },
      "Subscribers fetched successfully"
    )
  );
});

// ─────────────────────────────────────────
// GET CHANNELS USER SUBSCRIBED TO
// ─────────────────────────────────────────
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const subscribedChannels = await Subscription.aggregate([
    // find all subscriptions by this user
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    // join channel details
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelDetails",
        pipeline: [
          {
            $project: { username: 1, avatar: 1, fullName: 1 },
          },
        ],
      },
    },
    { $unwind: "$channelDetails" },
    {
      $project: {
        channelDetails: 1,
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSubscribedChannels: subscribedChannels.length,
        subscribedChannels,
      },
      "Subscribed channels fetched successfully"
    )
  );
});

export {
  toggleSubscription,
  getChannelSubscribers,
  getSubscribedChannels,
};