import Contact from "../models/contacts.model.js";

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const read = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    return res.json(contact);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid contact id" });
  }
};

const remove = async (req, res) => {
  try {
    const removed = await Contact.findByIdAndDelete(req.params.contactId);
    if (!removed) return res.status(404).json({ error: "Contact not found" });
    return res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid contact id" });
  }
};

export default { create, list, read, remove };
