interface Config {
	PORT: Number;
	NODE_ENV: string;
	MONGODB_URI: string;
	BETTER_AUTH_SECRET: string;
	GMAIL_USER: string;
	GMAIL_PASS: string;
	SECRET_KEY: string;
	// GOOGLE_CLIENT_ID: string;
	// GOOGLE_CLIENT_SECRET: string;
	// REDIS_HOST: string;
	// REDIS_PASSWORD: string;
	// JWT_SECRET: string;
	// JWT_EXPIRES_IN: string;
	// RSA_PUBLIC_KEY: string;
	// RSA_PRIVATE_KEY: string;
}

interface MailgenConfig {
	theme?: string;
	product?: {
		name: string;
		link: string;
		logo?: string;
		copyright?: string;
	};
}

interface EmailConfig {
	service?: string;
	auth?: {
		user?: string;
		pass?: string;
	};
}

export type { Config, MailgenConfig, EmailConfig };
