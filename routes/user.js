const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const { courseModel } = require("../db");
const { purchaseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/user-auth");
const { JWT_USER_PASSWORD } = require('../config');

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (user) {
      res.status(403).json({
        error: "you already have an account. Please Sign in.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      await userModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
    }
  } catch {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      res.status(403).json({
        error: "you haven't signed up yet. Please sign up",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const authorization = jwt.sign(
          {
            id: user._id.toString(),
          },
          JWT_USER_PASSWORD
        );

        res.header("authorization", authorization);
        res.json({
          authorization,
        });
      } else {
        error: "Invalid password";
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});


userRouter.get("/purchases", userAuth, async (req, res) => {
    const userId = req.id;
    const purchases = await purchaseModel.find({
        userId
    })    

    const coursesData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })

    res.json({
        userId,
        coursesData
    })
});

module.exports = {
  userRouter
};
