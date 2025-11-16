import express from "express";
import contactCtrl from "../controllers/contacts.controller.js";
const router = express.Router();

router.route("/api/contacts").post(contactCtrl.create);
router.route("/api/contacts").get(contactCtrl.list);
router.route("/api/contacts").delete(contactCtrl.removeAll);
router
  .route("/api/contacts/:contactId")
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;
