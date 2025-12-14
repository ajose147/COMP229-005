import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";
const signin = async (req, res) => {
  try {
    console.log('Auth.signin called:', { method: req.method, url: req.originalUrl });
    console.log('Auth.signin headers:', req.headers);
    console.log('Auth.signin body (parsed):', req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .send({ error: "Email and password don't match." });
    }
    // create a signed JWT that expires in 1 day and include role
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, {
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
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Auth.signin error:', err && err.message ? err.message : err);
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
  // allow token in Authorization header (Bearer ...) or in cookie named 't'
  getToken: (req) => {
    if (!req) return null;
    // Check Authorization header
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
    }
    // Fallback to cookie 't'
    if (req.cookies && req.cookies.t) return req.cookies.t;
    return null;
  },
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

const isAdmin = (req, res, next) => {
  console.log('Auth.isAdmin check, req.auth:', req.auth);
  // requireSignin should populate req.auth with token payload
  if (req.auth && req.auth.role && req.auth.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Admin resource. Access denied." });
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin };
