
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const User=require("../models/User")


const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete avatar image
router.delete("/:id/image", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json("avatar has been deleted...");
    if (!user.image) {
      return res.status(400).json("User does not have an image");
    }
    user.image = undefined;
    await user.save();

    res.status(200).json("User image has been deleted...");

  } catch (err) {
    console.log(err);
  }
});

//GET USER
router.get("/find/:id",  verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {accessToken, password, ...others } = user._doc;
    res.status(200).json(others);

  } catch (err) {
    res.status(500).json(err);
    return res.status(403).json("You are not allowed!");
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});





  module.exports = router;