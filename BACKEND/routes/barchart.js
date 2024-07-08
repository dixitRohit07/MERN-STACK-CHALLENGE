// transactions.js

import express from 'express';
import dbConnect from '../mongodb.js'; // Adjust path as necessary

const router = express.Router();

const getMonthNumber = (monthName) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(monthName) + 1;
};

router.get('/barchart', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    const monthNumber = getMonthNumber(month);
    if (monthNumber === 0) {
        return res.status(400).json({ error: 'Invalid month' });
    }

    try {
        const collection = await dbConnect();
        const query = {
            $expr: {
                $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthNumber]
            }
        };

        const transactions = await collection.find(query).toArray();
        if (!transactions.length) {
            return res.status(404).json({ error: 'No transactions found for the selected month' });
        }

        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const priceRangeCounts = priceRanges.map(({ range, min, max }) => {
            const count = transactions.filter(transaction => transaction.price >= min && transaction.price <= max).length;
            return { range, count };
        });

        res.json(priceRangeCounts);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
});

export default router;
