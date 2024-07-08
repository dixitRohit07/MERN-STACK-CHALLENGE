import { MongoClient } from 'mongodb';
const url = process.env.DBURL || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'SaleDatabase';

async function dbConnect() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db.collection('transactions');
  }
  
dbConnect();
export default dbConnect;