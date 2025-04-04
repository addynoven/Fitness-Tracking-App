import mongoose, { Schema } from "mongoose";
import type { IUserProfile } from "./.Mongodb.types";

const UserProfileSchema = new Schema<IUserProfile>(
	{
		userId: { type: String, required: true, unique: true },
		age: { type: Number, required: true },
		weight: { type: Number, required: true },
		height: { type: Number, required: true },
		fitnessGoals: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
