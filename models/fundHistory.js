import mongoose, { mongo } from "mongoose";


const fundHistorySchema = mongoose.Schema({
    numberOfInvestmentUnits:{
        type: Number,
        required: true
    },
    fund:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funds'
    }
})

const fundHistory = mongoose.model("FundHistory", fundHistorySchema);

export default fundHistory;