import { Router } from "express";
import StatusCodes from "http-status-codes";
import AssetService from "../services/Asset.service.js";

// Constants
const router = Router();
const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

// Paths
const path = {
  transfer: "/transfer",
};

/**
 * Transfer asset
 */
router.post(path.transfer, async (req, res) => {
  try {
    const tx = await AssetService.transfer(req.body);
    return res.status(OK).json(tx);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

export default router;
