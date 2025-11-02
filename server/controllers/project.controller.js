import Project from '../models/project.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Create new project
const create = async (req, res) => {
  const project = new Project(req.body)
  try {
    await project.save()
    return res.status(200).json({ message: "Project added successfully!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Get all projects
const list = async (req, res) => {
  try {
    let projects = await Project.find()
    res.json(projects)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware to find project by ID
const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id)
    if (!project) return res.status(400).json({ error: "Project not found" })
    req.project = project
    next()
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" })
  }
}

// Get project by ID
const read = (req, res) => {
  return res.json(req.project)
}

// Update project by ID
const update = async (req, res) => {
  try {
    let project = req.project
    Object.assign(project, req.body) // Update fields
    await project.save()
    res.json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove project by ID
const remove = async (req, res) => {
  try {
    let project = req.project
    let deletedProject = await project.deleteOne()
    res.json(deletedProject)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Remove all projects
const removeAll = async (req, res) => {
  try {
    await Project.deleteMany({})
    res.json({ message: "All projects removed!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, projectByID, read, list, remove, update, removeAll }