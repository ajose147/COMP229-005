import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .send({ error: "Email and password don't match." });
    }
    // create a signed JWT that expires in 1 day
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1d",
    });
    // set cookie with proper options (use `expires` or `maxAge`, not `expire`)
    res.cookie("t", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};
const signout = (req, res) => {
  res.clearCookie("t", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax", // or 'None' if using cross-origin with HTTPS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
  });
  return res.status(200).json({
    message: "signed out",
  });
};
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  // compare IDs as strings to avoid ObjectId vs string mismatch
  const authorized =
    req.profile &&
    req.auth &&
    String(req.profile._id) === String(req.auth._id);
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
