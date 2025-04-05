// models/UserProfile.ts
import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User", // or whatever Butter Auth's user model is
			unique: true,
		},
		age: {
			type: Number,
			required: false,
		},
		weight: {
			type: Number,
			required: false,
		},
		height: {
			type: Number,
			required: false,
		},
		fitnessGoals: {
			type: String,
			enum: [
				"Weight Loss",
				"Muscle Gain",
				"Endurance",
				"General Health",
				"Other",
			],
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
		},
		activityLevel: {
			type: String,
			enum: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
		},
		dietaryPreferences: {
			type: [String],
			enum: [
				"Vegetarian",
				"Vegan",
				"Keto",
				"Paleo",
				"Mediterranean",
				"Low Carb",
				"High Protein",
				"Gluten-Free",
				"Dairy-Free",
				"Pescatarian",
				"Halal",
				"Kosher",
				"Intermittent Fasting",
				"Other",
			],
			default: [],
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for reverse population
userProfileSchema.virtual("activities", {
	ref: "Activity",
	localField: "userId",
	foreignField: "userId",
});

export default mongoose.model("UserProfile", userProfileSchema);
