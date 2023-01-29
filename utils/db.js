import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        // create connection to mongo database
        mongoose.set("strictQuery", false);
        const conn = mongoose.connect(process.env.URI);

        console.log(`Mongo Db connected`);
    } catch (error) {
        console.log(`connection faild : ${error}`);

        process.exit(1);
    }
}