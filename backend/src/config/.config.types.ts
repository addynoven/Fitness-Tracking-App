interface Config {
	PORT: string;
	NODE_ENV: string;
	MONGODB_URI: string;
	GMAIL_USER: string;
	GMAIL_PASS: string;
	// GOOGLE_CLIENT_ID: string;
	// GOOGLE_CLIENT_SECRET: string;
	// REDIS_HOST: string;
	// REDIS_PASSWORD: string;
	// JWT_SECRET: string;
	// JWT_EXPIRES_IN: string;
	// RSA_PUBLIC_KEY: string;
	// RSA_PRIVATE_KEY: string;
	// SECRET_KEY: string;
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
