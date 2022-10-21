import { Router } from "express";
import * as wishlistCtrl from '../controllers/wishlists.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, wishlistCtrl.index)
router.post('/', checkAuth, wishlistCtrl.create)

export { router }