import { Router } from "express";
import assetRouter from "./Asset.router.js";
import transferRouter from "./Transfer.router.js";

const baseRouter = Router();

// Setup routers
baseRouter.use("", assetRouter);
baseRouter.use("", transferRouter);

export default baseRouter;
