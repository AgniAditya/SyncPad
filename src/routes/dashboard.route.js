import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middkeware.js"
import { getDashboardInfo } from "../controllers/dashboard.controller.js"

const router = Router()
router.use(verifyJWT)

router.route('/').get(getDashboardInfo)

export default router