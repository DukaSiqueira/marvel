const { Router } = require('express')
const router = Router()
const { validateCreateUser, validateId } = require('../middlewares/validation')
const { authenticateToken } = require('../middlewares/auth')
const { findAll, findById, createUser, patchUser, destroyUser } = require('../controllers/user')

router.get("/", authenticateToken, findAll);
router.get("/:id", authenticateToken, validateId, findById);
router.post("/", validateCreateUser, createUser);
router.patch("/:id", authenticateToken, validateId, patchUser);
router.delete("/:id", authenticateToken, validateId, destroyUser);

module.exports = router