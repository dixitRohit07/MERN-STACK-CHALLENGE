// transactions.js

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/combined', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    try {
        // Define URLs for the existing APIs
        const statisticsURL = `http://localhost:5000/api/statistics?month=${month}`;
        const barChartURL = `http://localhost:5000/api/barchart?month=${month}`;
        const pieChartURL = `http://localhost:5000/api/piechart?month=${month}`;

        // Fetch data from all three APIs
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            fetch(statisticsURL).then(res => res.json()),
            fetch(barChartURL).then(res => res.json()),
            fetch(pieChartURL).then(res => res.json())
        ]);

        // Combine the data
        const combinedData = {
            statistics: statisticsResponse,
            barChart: barChartResponse,
            pieChart: pieChartResponse
        };

        // Send the combined data as response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ error: 'Error fetching combined data' });
    }
});

export default router;
