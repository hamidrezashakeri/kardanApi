import Members from '../models/members.js';
import Funds from '../models/funds.js';

export const issuing = async (req, res) => {
  const fund = req.params.id;
  try {
    const existFund = await Funds.findById(fund);
    if (!existFund) {
      return res.status(404).json({ message: 'found not found' });
    }
    await membersSchema.validate(req.body, { abortEarly: false });
    if (req.body.numberOfUnitsPurchased < existFund.numberOfInvestmentUnits) {
      const member = await Members.create({
        ...req.body,
        investmentAmount:
          existFund.issuancePricePerUnit * req.body.numberOfUnitsPurchased,
        fundTypeIssued: existFund._id,
      });
      if (member) {
        await Funds.findByIdAndUpdate(existFund._id, {
          numberOfInvestmentUnits:
            existFund.numberOfInvestmentUnits - req.body.numberOfUnitsPurchased,
        });
      }
    } else {
      res.status(401).json({
        message: 'Number of unit bigger than number of investment units',
      });
    }
  } catch (err) {
    res.status(422).json({ message: err.errors });
  }
};

export const canceling = async (req, res) => {
  const memeberId = req.params.id;
  if (!memeberId) {
    return res.status(404).json({ message: 'user not found' });
  }
  const member = await Members.findOne({ _id: memeberId }).populate(
    'fundTypeIssued'
  );
  try {
    if (member) {
      const deletedMember = await Members.findByIdAndRemove(memeberId);
      if (deletedMember) {
        await Funds.findByIdAndUpdate(member.fundTypeIssued, {
          numberOfInvestmentUnits:
            member.fundTypeIssued.numberOfInvestmentUnits +
            member.numberOfUnitsPurchased,
        });
        return res.status(200).json({ message: 'member has been deleted' });
      }
    }
  } catch (err) {
    res.status(422).json({ message: err.errors });
  }
};
