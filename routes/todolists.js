import { Router } from 'express'
import * as todolistCtrl from '../controllers/todolists.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)


export { router }