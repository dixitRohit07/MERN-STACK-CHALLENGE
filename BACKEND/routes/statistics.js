import express from 'express';
// import Transaction from '../models/Transaction.js';
import Transaction from '../routes/transactions.js';

const router = express.Router();

// Endpoint to get statistics for a selected month
router.get('/statistics', async (req, res) => {
    const { month } = req.query;

    try {
        const totalSaleAmount = await Transaction.aggregate([
            {
                $match: { dateOfSale: { $regex: new RegExp(month, 'i') } }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$amount' },
                    totalSoldItems: { $sum: { $cond: { if: { $eq: ['$sold', true] }, then: 1, else: 0 } } },
                    totalNotSoldItems: { $sum: { $cond: { if: { $eq: ['$sold', false] }, then: 1, else: 0 } } }
                }
            }
        ]);

        if (totalSaleAmount.length === 0) {
            return res.status(404).json({ message: 'No data found for the selected month' });
        }

        res.json(totalSaleAmount[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;

