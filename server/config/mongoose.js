import mongoose from "mongoose";

export async function connectDB(req, res) {
  await mongoose
    .connect(`${process.env.MONGO_URI}/job-portal`)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(`DB error found ,${err}`));
}
