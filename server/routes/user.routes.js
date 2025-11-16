import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();
router.route("/api/users").post(userCtrl.create);
router.route("/api/users").get(userCtrl.list);
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);
// `userId` param will populate req.profile. The routes for GET/PUT/DELETE
// are already declared above with authentication and authorization, so
// no unprotected duplicates are necessary here.
export default router;
