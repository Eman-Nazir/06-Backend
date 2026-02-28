import mongoose from "mongoose";

const subTodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    complete: {
      type: Boolean,
      defualt: false,
    },

    cretaedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
