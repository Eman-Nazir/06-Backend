import mongoose from "mongoose";

const todoScehma = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    compelte: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true },
);

export const todo = mongoose.model("Todo", todoScehma);
