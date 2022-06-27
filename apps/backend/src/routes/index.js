import { Router } from "express";
import assetRouter from "./Asset.router.js";

const baseRouter = Router();

// Setup routers
baseRouter.use("", assetRouter);

export default baseRouter;
