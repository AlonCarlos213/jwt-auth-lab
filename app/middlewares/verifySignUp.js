// 📁 app/middlewares/verifySignUp.js
import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.user;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }

    const email = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (email) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};
