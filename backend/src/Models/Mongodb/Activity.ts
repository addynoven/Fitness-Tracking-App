// models/Activity.ts
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		type: {
			type: String,
			required: true,
			enum: [
				"Running",
				"Walking",
				"Cycling",
				"Swimming",
				"Gym",
				"Yoga",
				"Other",
			],
			default: "Other",
		},
		duration: {
			type: Number, // duration in minutes
			required: true,
		},
		caloriesBurned: {
			type: Number,
			required: true,
		},
		notes: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
