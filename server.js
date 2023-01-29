import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDb } from './utils/db.js';
import fundHistory from './models/fundHistory.js';
import Funds from './models/funds.js';
import fundsRoutes from './routes/funds.js';
import membersRoutes from './routes/members.js';
import { CronJob } from 'cron';

const job = new CronJob('0 0 23 * * *', async () => {
  const fund = await Funds.find({ updatedAt: { $lte: new Date() } });
  await Promise.all(
    fund.map(async (f) => {
      const existFund = await fundHistory.find({ fund: f._id });
      if (existFund) {
        await fundHistory.findByIdAndUpdate(existFund._id, {
          numberOfInvestmentUnits: fund.numberOfInvestmentUnits,
        });
      }else{
        await fundHistory.create({numberOfInvestmentUnits: f.numberOfInvestmentUnits});
      }
    })
  );
});

job.start();

// config dotenv for use invironment variable
dotenv.config();

//initialize express
const app = express();
app.use(express.json()); //parse incoming request object to JSON
app.use(cors()); // anable cors

// routes
app.use('/api/funds', fundsRoutes);
app.use('/api/members', membersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
  connectDb();
});
