// In server/routes/qualification.routes.js
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js' // 1. Import auth

const router = express.Router()

router.route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(authCtrl.requireSignin, qualificationCtrl.create) // 2. Protected
  .delete(authCtrl.requireSignin, qualificationCtrl.removeAll) // 2. Protected

router.route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(authCtrl.requireSignin, qualificationCtrl.update) // 2. Protected
  .delete(authCtrl.requireSignin, qualificationCtrl.remove) // 2. Protected

router.param('qualificationId', qualificationCtrl.qualificationByID)
export default router