import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

// Public reads
router.route("/api/projects").get(projectCtrl.list);
router.route("/api/projects/:projectId").get(projectCtrl.read);

// Admin write routes
router.route("/api/projects").post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create);
router.route("/api/projects").delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll);
router.route("/api/projects/:projectId").put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update);
router.route("/api/projects/:projectId").delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;
