import { connect } from "mongoose";

export default async () => {
  try {
    await connect("mongodb://localhost:27017/express-mongo");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
}