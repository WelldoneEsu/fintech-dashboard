const express = require('express');
const router = express.Router();
const { makeTransaction } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Perform a credit or debit transactions 
 *     tags: (transactions)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: (credit, debit)
 *             amount:
 *               type: number
 *   responses:
 *     201:
 *       description: Transaction successful
 *     400:
 *       description: Validation error
 */

router.post('/', protect, makeTransaction);

module.exports = router;
