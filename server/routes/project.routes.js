import express from "express";
import projectCtrl from "../controllers/projects.controller.js";
const router = express.Router();

router.route("/api/projects").post(projectCtrl.create);
router.route("/api/projects").get(projectCtrl.list);
router.route("/api/projects").delete(projectCtrl.removeAll);
router
  .route("/api/projects/:projectId")
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;
