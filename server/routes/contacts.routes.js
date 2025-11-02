import express from "express";
import contactsController from "../controllers/contacts.controller.js";

const router = express.Router();

router.post("/api/contacts", contactsController.create);
router.get("/api/contacts", contactsController.list);
router.get("/api/contacts/:contactId", contactsController.read);
router.delete("/api/contacts/:contactId", contactsController.remove);

export default router;
