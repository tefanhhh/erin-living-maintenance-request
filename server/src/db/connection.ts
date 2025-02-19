import { connect } from "mongoose";

export default async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
}