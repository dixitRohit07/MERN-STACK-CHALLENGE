// transactions.js

import express from 'express';
import dbConnect from '../mongodb.js'; // Adjust the path as necessary

const router = express.Router();

const getMonthNumber = (monthName) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(monthName) + 1;
};

// API for pie chart data
router.get('/piechart', async (req, res) => {
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

        // Query to filter transactions by the selected month
        const query = {
            $expr: {
                $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthNumber]
            }
        };

        const transactions = await collection.find(query).toArray();
        if (!transactions.length) {
            return res.status(404).json({ error: 'No transactions found for the selected month' });
        }

        // Group by category and count the number of items in each category
        const categoryCounts = transactions.reduce((acc, transaction) => {
            const category = transaction.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category]++;
            return acc;
        }, {});

        // Format the result for pie chart
        const result = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
});

export default router;
