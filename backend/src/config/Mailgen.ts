import Mailgen from "mailgen";

import type { MailgenConfig } from "./.config.types";

const mailGenerator = (config: MailgenConfig) => {
	return new Mailgen({
		theme: config.theme || "default",
		product: {
			name: config.product?.name || " ",
			link: config.product?.link || "http://localhost:5173/",
			logo: config.product?.logo || " ",
		},
	});
};

export default mailGenerator;
