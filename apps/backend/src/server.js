import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import StatusCodes from "http-status-codes";
import routes from "./routes/index.js";
import { init } from "./services/Hyperledger.service.js";

// Initialize express
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use(routes);

// Error handling
app.use((err, _, res, __) => {
  console.error(err, true);

  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message,
  });
});

// Initialize fabric
await init();

export default app;
