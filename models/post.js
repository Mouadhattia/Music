const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

mongoose.model("post", postSchema);
