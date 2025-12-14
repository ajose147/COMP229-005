import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Create new user
const create = async (req, res) => {
  const user = new User(req.body);
  // force role to 'user' on public signup to prevent privilege escalation
  user.role = 'user';
  try {
    await user.save()
    return res.status(200).json({ message: "User added successfully!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get all users
const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware to find user by ID
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user) return res.status(400).json({ error: "User not found" })
    req.profile = user // Puts user on 'profile' property of request
    next()
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" })
  }
}

// Get user by ID
const read = (req, res) => {
  req.profile.password = undefined // Hide password
  return res.json(req.profile)
}

// Update user by ID
const update = async (req, res) => {
  try {
    let user = req.profile
    Object.assign(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.password = undefined // Hide password
    res.json(user)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove user by ID
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.deleteOne()
    deletedUser.password = undefined // Hide password
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove all users
const removeAll = async (req, res) => {
  try {
    await User.deleteMany({})
    res.json({ message: "All users removed!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, userByID, read, list, remove, update, removeAll }