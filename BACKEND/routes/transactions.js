import express from 'express';
import dbConnect from '../mongodb.js';
import Product from '../models/Product.js'; // Ensure this is the correct path

const router = express.Router();

// Helper function to convert month name to month number
const getMonthNumber = (monthName) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames.indexOf(monthName) + 1;
};

// Route to get transactions with search and pagination
router.get('/transactions', async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;

  // Convert month name to number
  const monthNumber = getMonthNumber(month);
  if (monthNumber === 0) {
    return res.status(400).json({ message: 'Invalid month parameter' });
  }

  try {
    const collection = await dbConnect();

    // Build the query
    const query = {
      $expr: {
        $eq: [{ $month: { $dateFromString: { dateString: "$dateOfSale" } } }, monthNumber]
      }
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: parseFloat(search) }
      ];
    }

    // Pagination options
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const limit = parseInt(perPage);

    // Get transactions
    const transactions = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    res.json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      total,
      transactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions.');
  }
});

export default router;
