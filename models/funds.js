import mongoose from 'mongoose';

const foundsSchema = mongoose.Schema(
  {
    // مدیر صندوق
    manager: {
      type: String,
      required: true,
    },
    // متولی صندوق
    trustee: {
      type: String,
      required: true,
    },
    auditor:{
      type: String,
      required: true
    },
    // مدیران سرمایه گذاری
    investmentManagers: {
      type: [String],
      required: true,
    },
    // مدیر ثبت
    registrationManager: {
      type: String,
      required: true,
    },
    // تاریخ آغاز فعالیت
    activityStartDate: {
      type: Date,
      required: true,
    },
    // نوغ صندوق
    type: {
      type: String,
      enum: [
        'stock', //سهامی
        'mixed-investment', //مختلط
        'fixed-income', // با درامد ثابت
        'capital-guarantee', //تصمین اصل سرمایه
        'gold', //طلا
        'index', //شاخصی
        'benefit-investment', //نیکوکاری
        'oriented-investment', //بازارگردانی
        'financing', //نامین مالی
      ],
      required: true,
      default: 'fixed-income',
    },
    NAVCalculationDate: {
      type: Date,
      required: true,
    },
    numberOfInvestmentUnits: {
      type: Number,
      required: true,
    },
    totalPureValueOfAssets: {
      type: Number,
      required: true,
    },
    issuancePricePerUnit: {
      type: Number,
      required: true,
    },
    cancelationPricePerUnit: {
      type: Number,
      required: true,
    },
    statisticalPricePerUnit: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const funds = mongoose.model('Funds', foundsSchema);

export default funds;
