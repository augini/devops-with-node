import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    req.sessions.user = user;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).send({
        status: "success",
      });
    } else {
      res.status(400).send({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};
