import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import config from "../config/config";
import { openAPI } from "better-auth/plugins";

// Initialize the MongoDB client for Better Auth
const client = new MongoClient(config.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	secret: config.BETTER_AUTH_SECRET,
	emailAndPassword: {
		enabled: true,
	},
	plugins: [openAPI()],
});
