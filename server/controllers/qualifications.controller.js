import Qualification from "../models/qualifications.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const items = await Qualification.find();
    res.json(items);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const qualificationByID = async (req, res, next, id) => {
  try {
    const item = await Qualification.findById(id);
    if (!item) return res.status(404).json({ error: "Qualification not found" });
    req.qualification = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve qualification" });
  }
};

const read = (req, res) => {
  return res.json(req.qualification);
};

const update = async (req, res) => {
  try {
    let item = req.qualification;
    item = Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne();
    res.json({ message: "Qualification deleted" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications removed" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, qualificationByID, read, update, remove, removeAll };
