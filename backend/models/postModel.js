import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
      max: 150,
    },
    author: {
      type: String,
      min: 2,
      max: 30
    },
    content: {
      type: String,
      required: true,
      min: 10,
      max: 7000,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
