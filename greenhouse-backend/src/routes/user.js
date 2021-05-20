import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from "../util/helpers";

const userRouter = express.Router();
userRouter.post("", async (req, res) => {
  try {
    const { username, password } = req.body;
    await Joi.validate({ username, password }, signUp);

    const newUser = new User({ username, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser
    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get("/users", async (req, res) => {
  await User.find({}, (err, users) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!users.length) {
          return res
              .status(404)
              .json({ success: false, error: `users not found` })
      }
      return res.status(200).json({ success: true, data: users })
  }).catch(err => console.log(err))
});

export default userRouter;