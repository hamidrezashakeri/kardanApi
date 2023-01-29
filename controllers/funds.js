import Funds from '../models/funds.js';
import { fundSchema } from '../utils/validation.js';

export const addFund = async (req, res) => {
  try {
    await fundSchema.validate(req.body, { abortEarly: false });
    const fund = await Funds.create({ ...req.body });
    if (fund) {
      res.status(201).json({ message: 'the fund has been created' });
    }
  } catch (err) {
    res.status(422).json({ message: err.errors });
  }
};

export const getFunds = async (req, res) => {
  try {
    const validFunds = [
      'stock', //سهامی
      'mixed-investment', //مختلط
      'fixed-income', // با درامد ثابت
      'capital-guarantee', //تصمین اصل سرمایه
      'gold', //طلا
      'index', //شاخصی
      'benefit-investment', //نیکوکاری
      'oriented-investment', //بازارگردانی
      'financing', //نامین مالی
    ];
    const fund = req.query.fund || 'all';
    let funds;
    if (fund === 'all') {
      funds = await Funds.find();
    } else {
      const filtredFund = validFunds.find((f) => f === fund);
      if (filtredFund) {
        funds = await Funds.find({ type: fund });
      } else {
        return res.status(404).json({ message: 'fund not found' });
      }
    }
    res.status(200).json({ message: funds });
  } catch (error) {
    res.status(400).json({message: 'request failed'});
  }
};
