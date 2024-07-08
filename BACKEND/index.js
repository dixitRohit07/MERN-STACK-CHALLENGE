import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import initializeRoutes from './routes/initialize.js';;
import transactionRoutes from './routes/transactions.js';
import statisticsRoutes from './routes/statistics.js';
import barchartRoutes from './routes/barchart.js';
import piechartRoutes from './routes/piechart.js';
import combinedRoutes from './routes/combined.js'



const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("common"));

const port = process.env.PORT || 6000;
const url = process.env.DBURL;

// app.get('/',(req, resp) =>{
//     resp.send("hello world!!! Ranjeet Bawache");
// })

app.use('/', initializeRoutes);
app.use('/api', transactionRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', barchartRoutes);
app.use('/api', piechartRoutes);
app.use('/api', combinedRoutes);


app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
