const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("post");
const Video = mongoose.model("video");

const { check, validationResult } = require("express-validator");

router.get("/get", requireLogin, async (req, res) => {
  const id = req.query.id;
  try {
    const videos = await Video.find({ postedBy: id });
    return res.json(videos);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/", requireLogin, async (req, res) => {
  const { url } = req.body;
  let pst = url.value;
  try {
    await Video.create({
      url: pst,
      postedBy: req.user._id,
    });
    return res.sendStatus(200);
  } catch (e) {
    console.log({ e });
    return res.sendStatus(500);
  }
});

router.post("/delete", requireLogin, async (req, res) => {
  const { value, user_id } = req.body;
  try {
    await Video.deleteOne({ url: value, postedBy: user_id });
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
});

module.exports = router;
