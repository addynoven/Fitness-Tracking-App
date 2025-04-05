import express from "express";
import config from "./config/config";
import "./config/Mongodb"; // Initialize MongoDB connection
import cookieParser from "cookie-parser";
import morgan from "morgan";
import notFound from "./middleware/notfound";
import errorHandler from "./middleware/errorHandler";
import router from "./routes/index.Routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";

const app = express();

app.use(morgan("dev")); // HTTP request logger

app.all("/api/auth/*name", toNodeHandler(auth));

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Main application routes
app.use("/", router);

// Error handling middleware
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Handle other errors

// Start the servers
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
