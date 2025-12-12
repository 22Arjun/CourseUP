const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { courseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminAuth } = require("../middlewares/admin-auth");
const { JWT_ADMIN_PASSWORD } = require('../config');

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const admin = await adminModel.findOne({
      email,
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await adminModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      res.json({
        message: "Admin is Logged in",
      });
    } else {
      res.status(403).json({
        error: "you already have an account",
      });
    }
  } catch {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const admin = await adminModel.findOne({
      email,
    });

    if (!admin) {
      res.status(403).json({
        error: "you haven't signed up yet",
      });
    } else {
      const passwordMatch = bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        const authorization = jwt.sign({
          id: admin._id.toString()
      }, JWT_ADMIN_PASSWORD);

        res.header("authorization", authorization);
        res.json({
          authorization,
        });
      } else {
        res.json({
          error: "Invalid Password",
        });
      }
    }
  } catch {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
    const adminId = req.id;

    const { title, description, imageURL, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageURL,
        price,
        creatorId: adminId
    })

    res.json({
        message: "Course Created",
        courseId: course._id.toString()
    })

});

adminRouter.put("/course", adminAuth, async (req, res) => {
    const adminId = req.id;

    const { title, description, imageURL, price, courseId } = req.body;

   try{
    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    })

    if(!course) {
        res.status(401).json({
            error_message: "I know that you did it intentionally and you can't change someone else's Course Details"
        })
    }
    else {
        await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        imageURL: imageURL,
        description: description,
        price: price
    })

    res.json({
        message: "Cheers Mate!Course Updated"
    })
    }
    
   } 
   catch(error) {
    res.status(500).json({
        error_message: "something went wrong"
    })
   }
});

adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
    const adminId = req.id;
    const courseId = req.body;
    const course = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        creatorId: adminId,
        course 
    })
});
    
module.exports = {
  adminRouter: adminRouter
};
