import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
	if (!config.MONGODB_URI) {
		throw new Error("MongoDB URI is missing");
	}
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log("db connected");
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

connectDB();
