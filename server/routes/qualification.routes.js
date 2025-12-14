import express from "express";
import qualCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

// Public reads
router.route("/api/qualifications").get(qualCtrl.list);
router.route("/api/qualifications/:qualificationId").get(qualCtrl.read);

// Admin writes
router.route("/api/qualifications").post(authCtrl.requireSignin, authCtrl.isAdmin, qualCtrl.create);
router.route("/api/qualifications").delete(authCtrl.requireSignin, authCtrl.isAdmin, qualCtrl.removeAll);
router.route("/api/qualifications/:qualificationId").put(authCtrl.requireSignin, authCtrl.isAdmin, qualCtrl.update);
router.route("/api/qualifications/:qualificationId").delete(authCtrl.requireSignin, authCtrl.isAdmin, qualCtrl.remove);

router.param("qualificationId", qualCtrl.qualificationByID);

export default router;
