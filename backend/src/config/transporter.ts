import nodemailer from "nodemailer";
import config from "./config";
import type { EmailConfig } from "./.config.types";

const transporter = (emailConfig?: EmailConfig) => {
	return nodemailer.createTransport({
		service: emailConfig?.service || "gmail",
		auth: {
			user: emailConfig?.auth?.user || config.GMAIL_USER,
			pass: emailConfig?.auth?.pass || config.GMAIL_PASS,
		},
	});
};

export default transporter;
