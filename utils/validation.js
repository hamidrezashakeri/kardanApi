import * as yup from 'yup';
const formatJalaliDate =
  /^[1][1-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9])))/;
export const fundSchema = yup.object().shape({
  manager: yup.string().required('وارد کردن مدیر صندوق این فیلد الزامی است'),
  trustee: yup.string().required('وارد کردن متولی صندوق این فیلد الزامی است'),
  auditor: yup.string().required('وارد کردن نام حسابرس این فیلد الزامی است'),
  investmentManagers: yup
    .array(yup.string())
    .required('وارد کردن مدیر سرمایه گذاری این فیلد الزامی است'),
  registrationManager: yup.string().required('وارد کردن این فیلد الزامی است'),
  activityStartDate: yup
    .string()
    .matches(formatJalaliDate, 'فرمت تاریخ نامعتبر است')
    .required('وارد کردن تاریخ آغاز فعالیت الزامی است'),
  type: yup
    .string()
    .oneOf(
      [
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
      'باید بکی از مقادیر منو راانتخاب کنید'
    )
    .required('وارد کردن نوع صندوق الزامی است'),
  NAVCalculationDate: yup
    .string()
    .matches(formatJalaliDate, 'فرمت تاریخ نامعتبر است')
    .required('وارد کردن تاریخ محاسبه ان ای وی الزامی است'),
  numberOfInvestmentUnits: yup
    .number('عدد وارد نمایید')
    .required('وارد کردن واحد های سرمایه گذاری الزامی است')
    .moreThan(0, 'عددی بزرگتر از 0 وارد نمایید'),
  totalPureValueOfAssets: yup
    .number('عدد وارد نمایید')
    .required('وارد کردن ارزش خالص دارایی ها الزامی است')
    .moreThan(0, 'عددی بزرگتر از 0 وارد نمایید'),
  issuancePricePerUnit: yup
    .number('عدد وارد نمایید')
    .required('وارد کردن قیمت صدور هر واحد الزامی است')
    .moreThan(0, 'عددی بزرگتر از 0 وارد نمایید'),
  cancelationPricePerUnit: yup
    .number('عدد وارد نمایید')
    .required('وارد کردن قیمت ابطال هر واحد الزامی است')
    .moreThan(0, 'عددی بزرگتر از 0 وارد نمایید'),
  statisticalPricePerUnit: yup
    .number('عدد وارد نمایید')
    .required('وارد کردن قیمت واحد های آماری الزامی است')
    .moreThan(0, 'عددی بزرگتر از 0 وارد نمایید'),
  releaseDate: yup
    .string()
    .matches(formatJalaliDate, 'فرمت تاریخ نامعتبر است')
    .required('وارد کردن تاریخ انتشار الزامی است'),
});

export const membersSchema = yup.object().shape({
  traceCode: yup.number().required('وارد کردن کد پیگیری سجام الزامی است'),
  fullname: yup.string().required('وارد نمودن نام و نام خانوادگی الزامی است'),
  numberOfUnitsPurchased: yup
    .number()
    .required('وارد کردن تعداد واحد جهت خرید را وارد نمایید'),
});

