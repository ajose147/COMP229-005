import express from "express";
import qualCtrl from "../controllers/qualifications.controller.js";
const router = express.Router();

router.route("/api/qualifications").post(qualCtrl.create);
router.route("/api/qualifications").get(qualCtrl.list);
router.route("/api/qualifications").delete(qualCtrl.removeAll);
router
  .route("/api/qualifications/:qualificationId")
  .get(qualCtrl.read)
  .put(qualCtrl.update)
  .delete(qualCtrl.remove);

router.param("qualificationId", qualCtrl.qualificationByID);

export default router;
