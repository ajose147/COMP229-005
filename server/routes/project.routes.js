// In server/routes/project.routes.js
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js' // 1. Import auth

const router = express.Router()

router.route('/api/projects')
  .get(projectCtrl.list)
  .post(authCtrl.requireSignin, projectCtrl.create) // 2. Protected
  .delete(authCtrl.requireSignin, projectCtrl.removeAll) // 2. Protected

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(authCtrl.requireSignin, projectCtrl.update) // 2. Protected
  .delete(authCtrl.requireSignin, projectCtrl.remove) // 2. Protected

router.param('projectId', projectCtrl.projectByID)
export default router