import dotenv from "dotenv";
import type { Config } from "./.config.types";
import crypto from "crypto";

dotenv.config();

// Ensure required variables are defined
const requiredVars = [
	"MONGODB_URI",
	"GMAIL_USER",
	"GMAIL_PASS",
	"BETTER_AUTH_SECRET",
	// "GOOGLE_CLIENT_ID",
	// "GOOGLE_CLIENT_SECRET",
	// "REDIS_HOST",
	// "REDIS_PASSWORD",
	// "JWT_SECRET",
	// "JWT_EXPIRES_IN",
	// "RSA_PUBLIC_KEY",
	// "RSA_PRIVATE_KEY",
];

for (const varName of requiredVars) {
	if (!process.env[varName]) {
		throw new Error(`${varName} is not defined in environment variables`);
	}
}
const PORT = Number(process.env.PORT);
if (isNaN(PORT) || PORT < 0 || PORT > 65535)
	throw new Error("Invalid PORT number");

const config: Config = Object.freeze({
	PORT: PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || "development",
	MONGODB_URI: process.env.MONGODB_URI as string,
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
	GMAIL_USER: process.env.GMAIL_USER as string,
	GMAIL_PASS: process.env.GMAIL_PASS as string,
	// GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
	// GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
	// REDIS_HOST: process.env.REDIS_HOST as string,
	// REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
	// JWT_SECRET: process.env.JWT_SECRET as string,
	// JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
	// RSA_PUBLIC_KEY: (process.env.RSA_PUBLIC_KEY as string).replace(/\\n/g, "\n"),
	// RSA_PRIVATE_KEY: (process.env.RSA_PRIVATE_KEY as string).replace(
	// 	/\\n/g,
	// 	"\n"
	// ),
	// SECRET_KEY: crypto.randomBytes(32).toString("hex") as string,
});

export default config;
