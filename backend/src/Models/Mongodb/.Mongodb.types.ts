import type { Document } from "mongoose";

export interface IUserProfile extends Document {
	userId: string; // Link to Better Auth user
	age: number;
	weight: number;
	height: number;
	fitnessGoals: string;
	createdAt: Date;
	updatedAt: Date;
}
