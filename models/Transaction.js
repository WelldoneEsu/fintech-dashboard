const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
    type: {
        type: String,
        enum: ['credit', 'debit'],
        reqquired: true   
    },
    amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive!'],
    //description: 'The amount of the transaction, must be greater than 0.'
},
balanceAfter: {
    type: Number,
    required: true,
},
timestamp: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Transaction', transactionSchema);
