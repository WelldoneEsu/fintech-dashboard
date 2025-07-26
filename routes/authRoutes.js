const express = require('express'); 
const router = express.Router(); 
const { register, login, /*loginUser*/ } = require('../controllers/authController'); 
const { protect } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *   responses: 
 *     200:
 *       description: Login sucessful
 *     401:
 *       description: Invalid credentials
 */

router.post('/register', register); 
router.post('/login', login); 
module.exports = router;