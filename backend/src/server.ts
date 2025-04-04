import config from "./config/config";
import "./config/Mongodb";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import cors from "cors";
const app = express();

// CORS configuration
// app.use(
// 	cors({
// 		origin: "http://localhost:5173",
// 		credentials: true,
// 	})
// );

// Middleware

// Middleware for logging
app.use(morgan("dev"));

// Middleware for JSON data
app.use(express.json());

// Middleware for form data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser()); // Middleware for cookies

app.get("/", (req, res) => {
	res.send("Fitness Tracking API is running!");
});

//PORT
const PORT = Number(config.PORT);
if (isNaN(PORT) || PORT < 0 || PORT > 65535)
	throw new Error("Invalid PORT number");

//Server start
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
