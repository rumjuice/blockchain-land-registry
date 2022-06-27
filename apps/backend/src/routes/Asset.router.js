import { Router } from "express";
import StatusCodes from "http-status-codes";
import AssetService from "../services/Asset.service.js";

// Constants
const router = Router();
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } = StatusCodes;

// Paths
const path = {
  assets: "/assets",
  asset: "/assets/:assetId",
  transfer: "/transfer",
  hold: "/hold",
  unhold: "/unhold",
};

/**
 * Get single asset by id.
 */
router.get(path.asset, async (req, res) => {
  if (!req.params.assetId)
    return res.status(BAD_REQUEST).json("Asset ID is required!");

  const assets = await AssetService.getById(req.params.assetId);
  return res.status(OK).json(assets);
});

/**
 * Get all assets.
 */
router.get(path.assets, async (_, res) => {
  const assets = await AssetService.get();
  return res.status(OK).json(assets);
});

/**
 * Create asset.
 */
router.post(path.assets, async (req, res) => {
  if (req.body.area === "" || req.body.location === "" || req.body.owner === "")
    return res.status(BAD_REQUEST).json("Asset detail is required!");

  try {
    const asset = await AssetService.create(req.body);
    return res.status(CREATED).json(asset);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * Transfer
 */
router.post(path.transfer, async (req, res) => {
  try {
    const tx = await AssetService.transfer(req.body);
    return res.status(OK).json(tx);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * Hold
 */
router.post(path.hold, async (req, res) => {
  const assets = await AssetService.transfer(req.body);
  return res.status(OK).json(assets);
});

/**
 * Unhold
 */
router.post(path.unhold, async (req, res) => {
  const assets = await AssetService.transfer(req.body);
  return res.status(OK).json(assets);
});

export default router;
