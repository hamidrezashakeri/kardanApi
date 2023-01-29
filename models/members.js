import mongoose from "mongoose";


const membersSchema = mongoose.Schema({
    fundTypeIssued:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funds'
    },
    traceCode:{
        type: Number,
        required: true
    },
    fullname:{
        type: String,
        required: true,
    },
    investmentAmount:{
        type: Number,
        required: true
    },
    numberOfUnitsPurchased:{
        type: Number,
        required: true
    },
    numberOfUnitsCanceled:{
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

const members = mongoose.model("Members", membersSchema);

export default members;