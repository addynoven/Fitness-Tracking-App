// models/Mongodb/WeightEntry.ts
import mongoose, { Schema, Document } from "mongoose";

export interface WeightEntryDocument extends Document {
	userId: mongoose.Types.ObjectId;
	weight: number; // in kg
	date: Date;
	note?: string; // optional, for journaling
}

const WeightEntrySchema = new Schema<WeightEntryDocument>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		weight: { type: Number, required: true },
		date: { type: Date, default: Date.now, required: true },
		note: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model<WeightEntryDocument>(
	"WeightEntry",
	WeightEntrySchema
);
