import Qualification from '../models/qualification.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Create new qualification
const create = async (req, res) => {
  const qualification = new Qualification(req.body)
  try {
    await qualification.save()
    return res.status(200).json({ message: "Qualification added successfully!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get all qualifications
const list = async (req, res) => {
  try {
    let qualifications = await Qualification.find()
    res.json(qualifications)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware to find qualification by ID
const qualificationByID = async (req, res, next, id) => {
  try {
    let qualification = await Qualification.findById(id)
    if (!qualification) return res.status(400).json({ error: "Qualification not found" })
    req.qualification = qualification
    next()
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve qualification" })
  }
}

// Get qualification by ID
const read = (req, res) => {
  return res.json(req.qualification)
}

// Update qualification by ID
const update = async (req, res) => {
  try {
    let qualification = req.qualification
    Object.assign(qualification, req.body) // Update fields
    await qualification.save()
    res.json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove qualification by ID
const remove = async (req, res) => {
  try {
    let qualification = req.qualification
    let deletedQualification = await qualification.deleteOne()
    res.json(deletedQualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove all qualifications
const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({})
    res.json({ message: "All qualifications removed!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, qualificationByID, read, list, remove, update, removeAll }