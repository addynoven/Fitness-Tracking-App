// models/Goal.ts
import { Schema, model, Types } from "mongoose";

const goalSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
			unique: true, // Each user has one goal document
		},
		caloriesGoal: {
			type: Number,
			default: 5000,
		},
		workoutsGoal: {
			type: Number,
			default: 20,
		},
		durationGoal: {
			type: Number, // in minutes
			default: 900,
		},
		frequency: {
			type: String,
			enum: ["monthly", "weekly"],
			default: "monthly", // for future flexibility
		},
	},
	{ timestamps: true }
);

export const Goal = model("Goal", goalSchema);
