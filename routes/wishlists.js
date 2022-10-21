import { Router } from "express";
import * as wishlistCtrl from '../controllers/wishlists.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, wishlistCtrl.index)
router.get('/:id', checkAuth, wishlistCtrl.show)
router.post('/', checkAuth, wishlistCtrl.create)
router.put('/:id', checkAuth, wishlistCtrl.update)

export { router }