const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("post");
const Image = mongoose.model("image");

const { check, validationResult } = require("express-validator");

router.post("/deleteImages", requireLogin, async (req, res) => {
  const { imageId } = req.body;
  try {
    await Image.deleteOne({ _id: imageId });
    return res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    return res.sendStatus(500);
  }
});

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    let images = await Image.find({ postedBy: user_id });
    res.json({ images });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
