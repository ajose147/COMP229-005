import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

// Public read routes
router.route("/api/contacts").get(contactCtrl.list);
router.route("/api/contacts/:contactId").get(contactCtrl.read);

// Admin-only create/update/delete
router.route("/api/contacts").post(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.create);
router.route("/api/contacts").delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll);
router.route("/api/contacts/:contactId").put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update);
router.route("/api/contacts/:contactId").delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;
