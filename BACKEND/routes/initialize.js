import express from 'express';
import fetch from 'node-fetch';
import dbConnect from '../mongodb.js';
import Product from '../models/Product.js'; // Assuming you have a Product model

const router = express.Router();
const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

router.get('/', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    const data = await response.json();

    const collection = await dbConnect();
    console.log('Connected to MongoDB');

    await deleteDataInBatches(collection);
    console.log('Old data deleted');

    await collection.insertMany(data);
    console.log('New data inserted');

    res.status(200).send('Database initialized successfully with seed data.');
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).send(`Error initializing database: ${error.message}`);
  }
});

async function deleteDataInBatches(collection) {
  try {
    const result = await collection.deleteMany({}); // No limit or skip
    console.log(`Deleted ${result.deletedCount} documents`);
    return result.deletedCount;
  } catch (error) {
    console.error('Error during batch delete:', error);
    throw error;
  }
}

export default router;
