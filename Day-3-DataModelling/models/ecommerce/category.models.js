import mongosse from "mongoose";

const categorySchema = new mongosse.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Category = mongosse.model("Category", categorySchema);
